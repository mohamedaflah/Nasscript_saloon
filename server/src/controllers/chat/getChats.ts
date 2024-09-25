import { Request, Response } from "express";
import mongoose from "mongoose";
import chatModel from "../../models/chat.model";
import userModel from "../../models/user.model";

export const getUserChatsController = async (req: Request, res: Response) => {
  try {
    let { userId } = req.query;
    userId = String(userId);
    const chats = await chatModel.aggregate([
      {
        $match: {
          members: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$members",
      },
      {
        $match: {
          members: { $ne: new mongoose.Types.ObjectId(userId) }, // Exclude the user's own details
        },
      },
      {
        $lookup: {
          from: userModel.collection.name,
          localField: "members",
          foreignField: "_id",
          as: "opponentDetails",
        },
      },
      {
        $unwind: "$opponentDetails",
      },
      {
        $group: {
          _id: "$_id",
          propertyId: { $first: "$propertyId" },
          opponentDetails: { $push: "$opponentDetails" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $project: {
          _id: true,
          createdAt: false,
          updatedAt: false,
          propertyId: false,
        },
      },
      {
        $unwind: "$opponentDetails",
      },
    ]);
    const users = chats.map((ch) => ({
      ...ch.opponentDetails,
      chatId: ch._id,
    }));
    console.log(chats);

    return res
      .status(200)
      .json({ status: true, message: "Chats fetched", chats: users });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

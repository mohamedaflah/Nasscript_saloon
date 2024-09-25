import { Request, Response } from "express";
import chatModel from "../../models/chat.model";
import mongoose from "mongoose";
import userModel from "../../models/user.model";

export const createChatController = async (req: Request, res: Response) => {
  try {
    const { firstId, secondId } = req.body;

    let chat = await chatModel.findOne({
      members: {
        $all: [
          new mongoose.Types.ObjectId(firstId),
          new mongoose.Types.ObjectId(secondId),
        ],
      },
    });
    if (!chat) {
      chat = new chatModel({ members: [firstId, secondId] });
      await chat.save()
    }
    
    const user = await userModel.findOne({ _id: secondId });
    return res
      .status(201)
      .json({ status: true, message: "Chat created", user, chat });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

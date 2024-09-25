import { Request, Response } from "express";
import bookingModel from "../../models/booking.model";
import userModel from "../../models/user.model";
import propertyModel from "../../models/property.model";
import mongoose from "mongoose";

export const getBookingsWithUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const bookings = await bookingModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: userModel.collection.name,
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: propertyModel.collection.name,
          localField: "serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $unwind: "$service",
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return res.status(200).json(bookings);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

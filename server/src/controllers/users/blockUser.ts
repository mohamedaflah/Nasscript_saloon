import { NextFunction, Request, Response } from "express";
import userModel from "../../models/user.model";

export const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, status } = req.body;
    await userModel.updateOne({ _id: userId }, { $set: { status: status } });

    return res.status(200).json({
      status: true,
      message: "User updated",
      userId,
      userStatus: status,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

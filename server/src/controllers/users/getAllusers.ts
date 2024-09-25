import { NextFunction, Request, Response } from "express";
import userModel from "../../models/user.model";

export const getAllusersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.find({ role: "user" });
    return res.status(200).json({ status: true, message: "Success", users });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

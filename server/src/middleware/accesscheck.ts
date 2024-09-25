import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";

export const userAccessCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber } = req.body;
    const user = await userModel.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "user not exists" });
    }
    if (!user.status) {
      return res
        .status(401)
        .json({ status: false, message: "Your access has denied by admin" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

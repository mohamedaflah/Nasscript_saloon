import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model";
export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "token not found" });
    }
    const decode = jwt.verify(token, "secret");
    const { id } = decode as { id: string };
    const user = await userModel.findOne({ _id: id });
    return res.status(200).json({ status: false, message: "Success", user });
  } catch (error: any) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

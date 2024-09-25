import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
export const checkisAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ status: false, message: "Not autherized" });
    }
    const payload = jwt.verify(token, "secret");
    if (!payload || !(payload as { id: string })?.id) {
      return res.status(403).json({ status: false, message: "Not autherized" });
    }
    const user = await userModel.findOne({
      _id: (payload as { id: string }).id,
    });
    if (user.role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "You don't have access to get this data",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

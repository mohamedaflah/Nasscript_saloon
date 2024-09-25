import { NextFunction, Request, Response } from "express";
import propertyModel from "../../models/property.model";
import mongoose from "mongoose";
export type ErrType = any;
export const addPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    body.userId = new mongoose.Types.ObjectId(body.userId);
    const property = new propertyModel(body);
    await property.save();
    return res
      .status(200)
      .json({ status: true, message: "Successful", property });
  } catch (error: ErrType) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

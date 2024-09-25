import { Request, Response } from "express";
import { ErrType } from "./addproperty.controller";
import propertyModel from "../../models/property.model";

export const deletePropertyController = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.query;
    await propertyModel.deleteOne({ _id: propertyId });
    return res.status(200).json({ status: true, propertyId });
  } catch (error: ErrType) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

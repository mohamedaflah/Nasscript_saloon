import { Request, Response } from "express";
import { ErrType } from "./addproperty.controller";
import propertyModel from "../../models/property.model";

export const updatePropertyController = async (req: Request, res: Response) => {
  try {
    const { data, propertyId } = req.body;
    const property = await propertyModel.updateOne(
      { _id: propertyId },
      { $set: data },
      { new: true }
    );
    console.log("🚀 ~ updatePropertyController ~ property:", property)
    return res
      .status(200)
      .json({ status: true, message: "Successful", property,propertyId });
  } catch (error: ErrType) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

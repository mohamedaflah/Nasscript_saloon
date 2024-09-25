import { Request, Response } from "express";
import propertyModel from "../../models/property.model";

export const getPropertiesWithUser = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.params;
    const properties = await propertyModel.find({});
    return res
      .status(200)
      .json({ status: true, message: "Success", properties });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

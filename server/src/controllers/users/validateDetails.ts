import { Request, Response } from "express";
import userModel from "../../models/user.model";

export const validateUserDetails = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.body;

    
    const emailExist = await userModel.findOne({ email: email });
    if (emailExist) {
      return res
        .status(400)
        .json({ status: false, message: "Email already taken" });
    }
    const phoneNumberExist = await userModel.findOne({
      phoneNumber: phoneNumber,
    });
    if (phoneNumberExist) {
      return res
        .status(400)
        .json({ status: false, message: "Phone number is already exist" });
    }
    return res.status(200).json({ status: true, message: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

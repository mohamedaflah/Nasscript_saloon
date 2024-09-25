import { NextFunction, Request, Response } from "express";
import userModel from "../../models/user.model";
import { generateJWT } from "../../utils/generateToken";
import { cookieOptions } from "./signup.controller";
import bcrypt from "bcryptjs";
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, password } = req.body;

    const userExist = await userModel.findOne({ phoneNumber: phoneNumber });
    if (!userExist) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    const passCompare = bcrypt.compareSync(password, userExist.password);
    if (!passCompare) {
      return res
        .status(400)
        .json({ status: false, message: "User not found🤔" });
    }
    const token = generateJWT({ id: userExist._id });
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({ status: true, message: "Login success", user: userExist });
  } catch (error: any) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

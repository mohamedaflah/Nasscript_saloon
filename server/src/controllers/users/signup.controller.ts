import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../../utils/hashPass";
import userModel from "../../models/user.model";
import { generateJWT } from "../../utils/generateToken";
export const cookieOptions = {
  expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
  httpOnly: true, // This option makes the cookie accessible only by the web server
  // secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS if in production
  // sameSite: "strict", // Helps protect against CSRF attacks
};
export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    body.password = hashPassword(body.password);
    const userExist = await userModel.findOne({
      phoneNumber: body.phoneNumber,
    });
    if (userExist) {
      return res
        .status(400)
        .json({ status: false, message: "User already exist" });
    }
    const user = await new userModel(body);
    await user.save();
    delete user.password;
    const token = generateJWT({ id: user._id });
    return res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({ status: true, user, message: "User created" });
  } catch (error: Error | any) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

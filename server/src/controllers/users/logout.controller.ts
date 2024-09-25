import { NextFunction, Request, Response } from "express";

export const logoutController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res
      .clearCookie("token")
      .json({ status: true, message: "Logout success", user: null });
  } catch (error: any) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

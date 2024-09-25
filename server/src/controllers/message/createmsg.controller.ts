import { Request, Response } from "express";
import messageModel from "../../models/message.model";

export const createMessageController = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const msg = new messageModel(body);
    await msg.save();
    return res.status(200).json({ status: true, message: "Successful", msg });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

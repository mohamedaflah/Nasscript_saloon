import { Request, Response } from "express";
import messageModel from "../../models/message.model";

export const getAllMessagesController = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.query;
    const messages = await messageModel.find({ chatId: chatId });
    return res.status(200).json({ status: true, messages, message: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

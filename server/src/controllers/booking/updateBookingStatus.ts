import { Request, Response } from "express";
import bookingModel from "../../models/booking.model";

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId, status } = req.body;
    await bookingModel.updateOne(
      { _id: bookingId },
      { $set: { status: status } }
    );
    return res.status(200).json({ status: true, message: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

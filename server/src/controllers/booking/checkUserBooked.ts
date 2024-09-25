import { Request, Response } from "express";
import bookingModel from "../../models/booking.model";

export const checkIfUserBooked = async (req: Request, res: Response) => {
  try {
    const { userId, serviceId } = req.query;

    const existingBooking = await bookingModel.findOne({
      userId,
      serviceId,
      status: "Pending",
    });
    if (existingBooking) {
      return res.status(200).json({ isBooked: true });
    } else {
      return res.status(200).json({ isBooked: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

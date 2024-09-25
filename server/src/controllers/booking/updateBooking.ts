import { Request, Response } from "express";
import bookingModel from "../../models/booking.model";
import mongoose from "mongoose";

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { time, date, serviceId, bookingId } = req.body;

    const bookingDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    bookingDate.setHours(hours, minutes);

    const startRange = new Date(bookingDate);
    const endRange = new Date(bookingDate);
    startRange.setHours(bookingDate.getHours() - 1);
    endRange.setHours(bookingDate.getHours() + 1);

    const conflictingBooking = await bookingModel.findOne({
      serviceId: new mongoose.Types.ObjectId(serviceId),
      date: date,
      time: {
        $gte: startRange.toISOString().split("T")[1].slice(0, 5),
        $lte: endRange.toISOString().split("T")[1].slice(0, 5),
      },
    });

    // If a conflicting booking is found, prevent new booking
    if (conflictingBooking) {
      return res.status(400).json({
        status: false,
        message: "A booking already exists within the selected time slot.",
      });
    }
    await bookingModel.updateOne(
      { _id: bookingId },
      { $set: { time: time, date: new Date(date) } }
    );

    return res.status(200).json({ status: true, message: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
};

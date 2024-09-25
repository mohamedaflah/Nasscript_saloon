import mongoose from "mongoose";

const bookingModel = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    date: Date,
    time: String,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Rejected", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.booking ||
  mongoose.model("booking", bookingModel);

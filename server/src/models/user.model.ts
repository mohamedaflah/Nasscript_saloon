import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: String,
    phoneNumber: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    email: {
      // unique: true,
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.user || mongoose.model("user", userModel);

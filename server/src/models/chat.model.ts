import mongoose, { mongo } from "mongoose";

const chatModel = new mongoose.Schema(
  {
    members: [mongoose.Types.ObjectId],
    propertyId: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.models.chats || mongoose.model("chats", chatModel);

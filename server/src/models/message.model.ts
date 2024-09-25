import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    chatId: mongoose.Types.ObjectId,
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    content: {
      type: {
        type: String,
        enum: ["image", "video", "audio", "text"],
      },
      content: String,
      isReply: Boolean,
    },
    status: {
      type: String,
      enum: ["read", "unread"],
    },
    repliedMessage: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.models.messages ||
  mongoose.model("messages", messageModel);

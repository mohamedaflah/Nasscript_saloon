import { IUser } from "./user.types";

export interface ChatReducerInitial {
  messageLoading: boolean;
  chatLoading: boolean;
  chats: (IUser & { chatId: string })[] | null;
  messages: IMessage[] | null;
  error: boolean | string;
  selectedChatId: string | null;
  selectedUserId: string | null;
}

export interface IMessage {
  _id?: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: {
    type: "image" | "video" | "audio" | "text";
    isReply: boolean;
    content: string;
  };
  status: "read" | "unread";
  repliedMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

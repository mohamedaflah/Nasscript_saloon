import { axiosInstance } from "@/constants/axiosInstance";
import { IMessage } from "@/types/chat.types";
import { handleErrors } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createChatAction = createAsyncThunk(
  "chat/create-chat",
  async (
    sendPayload: { firstId: string; secondId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/chat/chat", sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const createMessage = createAsyncThunk(
  "chat/message/create-messaage",
  async (sendPayload: IMessage, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/chat/message", sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllChat = createAsyncThunk(
  "chat/getallchat",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/chat/chat?userId=${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "chat/message/getallmsg",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/chat/message?chatId=${chatId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

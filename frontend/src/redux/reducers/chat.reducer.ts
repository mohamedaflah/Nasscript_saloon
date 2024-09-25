import { ChatReducerInitial } from "@/types/chat.types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createChatAction,
  getAllChat,
  getAllMessages,
} from "../actions/chat.action";
import toast from "react-hot-toast";

const initialState: ChatReducerInitial = {
  chatLoading: false,
  messageLoading: false,
  chats: null,
  messages: null,
  error: false,
  selectedChatId: null,
  selectedUserId: null,
};
const chatReducer = createSlice({
  name: "chat-reducer",
  initialState,
  reducers: {
    setMessageLocally: (state, { payload }) => {
      state.messages?.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatAction.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(createChatAction.fulfilled, (state) => {
        state.chatLoading = false;
      })
      .addCase(createChatAction.rejected, (state, { payload }) => {
        state.chatLoading = false;
        state.error = String(payload);
        toast.error(state.error);
      })
      .addCase(getAllChat.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(getAllChat.fulfilled, (state, { payload }) => {
        state.chatLoading = false;
        state.chats = payload.chats;
        state.selectedChatId = state?.chats?.[0].chatId as string;
        state.selectedUserId = state?.chats?.[0]._id as string;
      })
      .addCase(getAllChat.rejected, (state, { payload }) => {
        state.chatLoading = false;
        state.error = String(payload);
        toast.error(state.error);
      })
      .addCase(getAllMessages.pending, (state) => {
        state.messageLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, { payload }) => {
        state.messageLoading = false;
        state.messages = payload.messages;
      })
      .addCase(getAllMessages.rejected, (state, { payload }) => {
        state.messageLoading = false;
        state.error = String(payload);
      });
  },
});
export const { setMessageLocally } = chatReducer.actions;
export default chatReducer.reducer;

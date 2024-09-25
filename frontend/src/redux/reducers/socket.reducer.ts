import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
const initialState: {
  socket: Socket | null;
  onlineUsers: { id: string; socketId: string }[] | null;
} = {
  socket: null,
  onlineUsers: null,
};
const socketReducer = createSlice({
  name: "socket reducer",
  reducers: {
    setSocketInstance: (state, { payload }) => {
      state.socket = payload;
    },
    setOnlineUsers:(state,{payload})=>{
      state.onlineUsers=payload
    }
  },
  initialState,
});

export default socketReducer.reducer;

export const { setSocketInstance,setOnlineUsers } = socketReducer.actions;

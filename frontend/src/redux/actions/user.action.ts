import { axiosInstance } from "@/constants/axiosInstance";
import { IUser } from "@/types/user.types";
import { handleErrors } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userSignup = createAsyncThunk(
  "user/signup",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/user/user", user);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (
    user: { phoneNumber: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/user/login", user);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getuser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/user/user");
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete("/user/user");
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const validateUser = createAsyncThunk(
  "user/validate",
  async (
    sendPayload: { email: string; phoneNumber: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/user/validate", sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAlluserAction = createAsyncThunk(
  "user/admin/getuser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/user/getalluser");
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateUserStatusAction = createAsyncThunk(
  "user/admin/update-user",
  async (
    sendPayload: { userId: string; status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.patch("/user/user", sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

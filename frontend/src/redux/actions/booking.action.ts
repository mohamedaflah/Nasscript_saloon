/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/constants/axiosInstance";
import { handleErrors } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBooking = createAsyncThunk(
  "booking/create-booking",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/booking/booking", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const checkUserBooking = createAsyncThunk(
  "booking/check-booking",
  async (
    { userId, serviceId }: { userId: string; serviceId: string },
    { rejectWithValue }
  ) => {
    try {
      // checkbooking
      const { data } = await axiosInstance.get(
        `/booking/checkbooking?userId=${userId}&serviceId=${serviceId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "booking/get-bookings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/booking/booking");
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "booking/update-status",
  async (
    { bookingId, status }: { bookingId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      // bookingId, status
      await axiosInstance.patch(`/booking/booking`, { bookingId, status });
      return { bookingId: bookingId, status: status };
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateBookingReschedule = createAsyncThunk(
  "booking/reshedule-booking",
  async (
    {
      bookingId,
      time,
      date,
      serviceId,
    }: {
      bookingId: string;
      time: string;
      date: Date;
      serviceId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.put(`/booking/booking`, {
        bookingId,
        time,
        date,
        serviceId,
      });
      return { bookingId: bookingId, time: time, date: date };
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getBookingWIthUser = createAsyncThunk(
  "booking/getbookingwithuser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/booking/getBooking/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

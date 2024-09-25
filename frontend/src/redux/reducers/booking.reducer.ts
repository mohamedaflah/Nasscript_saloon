import { BookingReducerInitial, IBooking } from "@/types/booking.type";
import { createSlice } from "@reduxjs/toolkit";
import {
  checkUserBooking,
  createBooking,
  getAllBookings,
  getBookingWIthUser,
  updateBookingReschedule,
  updateBookingStatus,
} from "../actions/booking.action";
import toast from "react-hot-toast";

const initialState: BookingReducerInitial = {
  loading: false,
  booking: null,
  bookings: null,
  error: false,
  isBooked: false,
  statusLoading: false,
};

const bookingReducer = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.isBooked = true;
        toast.success("Booking Successfull");
      })
      .addCase(createBooking.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(checkUserBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserBooking.fulfilled, (state, { payload }) => {
        state.isBooked = payload.isBooked;
        state.loading = false;
      })
      .addCase(checkUserBooking.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bookings = payload;
      })
      .addCase(getAllBookings.rejected, (state, { payload }) => {
        state.error = String(payload);
      })
      .addCase(updateBookingStatus.pending, (state) => {
        state.statusLoading = true;
      })
      .addCase(updateBookingStatus.fulfilled, (state, { payload }) => {
        state.statusLoading = false;
        state.bookings = state.bookings?.map((booking) => {
          if (booking?._id == payload.bookingId) {
            return { ...booking, status: payload.status };
          } else {
            return booking;
          }
        }) as IBooking[];
      })
      .addCase(updateBookingStatus.rejected, (state, { payload }) => {
        state.statusLoading = false;
        state.error = String(payload);
      })
      .addCase(updateBookingReschedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookingReschedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bookings = state.bookings?.map((booking) => {
          if (payload.bookingId == booking._id) {
            return { ...booking, time: payload.time, date: payload.date };
          } else {
            return booking;
          }
        }) as IBooking[];
      })
      .addCase(updateBookingReschedule.rejected, (state, { payload }) => {
        state.error = String(payload);
        toast.error(state.error);
      })
      .addCase(getBookingWIthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingWIthUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bookings = payload;
      })
      .addCase(getBookingWIthUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      });
  },
});

export default bookingReducer.reducer;

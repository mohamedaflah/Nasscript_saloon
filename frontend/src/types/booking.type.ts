import { IProperty } from "./property.types";
import { IUser } from "./user.types";

export interface IBooking {
  _id?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  date?: Date;
  time?: string;
  user: IUser;
  service: IProperty;
  status?:"Pending"|"Completed"|"Rejected"
}

export interface BookingReducerInitial {
  loading: boolean;
  error: string | boolean;
  bookings: IBooking[]|null;
  booking: IBooking|null;
  isBooked: boolean;
  statusLoading:boolean
}

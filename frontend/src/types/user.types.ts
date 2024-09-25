import { ConfirmationResult } from "firebase/auth";

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: "admin" | "user";
  status?:boolean
  createdAt?:Date
}
export interface IUserInitial {
  loading: boolean;
  verificationCheck: ConfirmationResult | null;
  isVerified: boolean;
  user: IUser | null;
  users:IUser[]|null
  err: string | boolean;
}

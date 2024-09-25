/* eslint-disable @typescript-eslint/no-unused-expressions */
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Define a regex for strong password validation
const strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
);
strongPasswordRegex;
const validatePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return false;
  }
  return phoneNumber.isValid();
};
const isValidEmail = (value: string) => {
  // Simple regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .refine((val) => !val.includes("$"), {
      message: "Username cannot contain the '$' symbol",
    }),

  phoneNumber: z.string().refine((value) => validatePhoneNumber(value), {
    message: "Mobile number is invalid or does not match the country code",
  }),

  email: z
    .string()
    .refine((val) => val === undefined || val === "" || isValidEmail(val), {
      message: "Invalid email address",
    }),

  password: z.string().min(8, "Password must be at least 8 characters long"),
  // .regex(
  //   strongPasswordRegex,
  //   "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
});

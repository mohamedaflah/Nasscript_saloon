import parsePhoneNumberFromString from "libphonenumber-js";
import { z } from "zod";
const validatePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return false;
  }
  return phoneNumber.isValid();
};
export const loginSchema = z.object({
  phoneNumber: z.string().refine((value) => validatePhoneNumber(value), {
    message: "Mobile number is invalid or does not match the country code",
  }),
  password: z.string().nonempty(),
});

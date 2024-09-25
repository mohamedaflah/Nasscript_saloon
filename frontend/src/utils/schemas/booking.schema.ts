import { z } from "zod";

export const bookingSchema = z.object({
  date: z.date(),
  time: z.string(),
});

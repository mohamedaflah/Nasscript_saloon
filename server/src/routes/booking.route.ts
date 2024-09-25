import { Router } from "express";
import { createBooking } from "../controllers/booking/createBooking";
import { getAllBookings } from "../controllers/booking/getAllBookings";
import { checkIfUserBooked } from "../controllers/booking/checkUserBooked";
import { updateBookingStatus } from "../controllers/booking/updateBookingStatus";
import { updateBooking } from "../controllers/booking/updateBooking";
import { getBookingsWithUser } from "../controllers/booking/getBookingWithUser";

const bookingRouter = Router();

bookingRouter
  .route("/booking")
  .post(createBooking)
  .get(getAllBookings)
  .patch(updateBookingStatus)
  .put(updateBooking);
bookingRouter.get("/checkbooking", checkIfUserBooked);
bookingRouter.get('/getBooking/:userId',getBookingsWithUser)
export default bookingRouter;

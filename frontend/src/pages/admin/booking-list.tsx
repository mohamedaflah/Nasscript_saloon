// export const UserList = () => {
//   return <main className="w-full h-full overflow-y-auto">

//   </main>;
// };

import UpdateBooking from "@/components/app/UpdateBooking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  getAllBookings,
  updateBookingStatus,
} from "@/redux/actions/booking.action";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertToAmPm } from "@/utils/convertTimeformat";
import { Card, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

const TABLE_HEAD = [
  "Service",
  "user name",
  "Amount",
  "Phone number",
  "Status",
  "Booking Date",
  "Booking Time",
  "Update Status",
  "Actions",
];

export function BookingLists() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const { bookings, statusLoading } = useAppSelector((state) => state.booking);

  return (
    <Card
      className="h-full w-full overflow-scroll"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <table className="w-full min-w-max table-auto text-left scrollbar-none">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50/55 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings?.map(
            ({ service, _id, user, date, time, status,...remain }, index) => {
              const isLast = index === bookings?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={String(_id)}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {service.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {user.username}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {service.price} QAR
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {user?.phoneNumber}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      <div
                        className={cn(
                          "h-7 flex-center px-3 border rounded-2xl ",
                          {
                            "bg-yellow-500 text-white": status == "Pending",
                            "bg-green-500 text-white": status == "Completed",
                            "bg-red-500 text-white": status == "Rejected",
                          }
                        )}
                      >
                        {status}
                      </div>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {format(String(date), "PPP")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {convertToAmPm(time as string)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {statusLoading ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                        </>
                      ) : (
                        <>
                          <Select
                            onValueChange={(value) => {
                              dispatch(
                                updateBookingStatus({
                                  bookingId: String(_id),
                                  status: value,
                                })
                              );
                            }}
                          >
                            <SelectTrigger className="w-[128px] text-[13px] ">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Completed">
                                Completed
                              </SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <UpdateBooking data={{ service, _id, user, date, time, status, ...remain }} />
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
}

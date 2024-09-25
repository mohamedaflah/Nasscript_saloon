// /getBooking/:userId

// export const UserList = () => {
//   return <main className="w-full h-full overflow-y-auto">

//   </main>;
// };

import { cn } from "@/lib/utils";
import { getBookingWIthUser } from "@/redux/actions/booking.action";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertToAmPm } from "@/utils/convertTimeformat";
import { Card, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect } from "react";

const TABLE_HEAD = [
  "Service",
  
  "Amount",
  "Status",
  "Booking Date",
  "Booking Time",
];

export function MyBooking() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getBookingWIthUser(user?._id as string));
  }, [dispatch, user?._id]);

  const { bookings } = useAppSelector((state) => state.booking);

  return (
    <main className="min-h-screen px-24 py-10">
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
              ({ service, _id,  date, time, status }, index) => {
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
                        {service.price} QAR
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
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </main>
  );
}

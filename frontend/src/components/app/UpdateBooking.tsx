/* eslint-disable @typescript-eslint/no-unused-expressions */
import { LoaderCircle, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookingSchema } from "@/utils/schemas/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";
import { updateBookingReschedule } from "@/redux/actions/booking.action";

import { IBooking } from "@/types/booking.type";

export default function UpdateBooking({ data }: { data: IBooking }) {
  const {
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { loading } = useAppSelector((state) => state.booking);

  const handleBookingSubmit = (values: z.infer<typeof bookingSchema>) => {
    dispatch(
      updateBookingReschedule({
        bookingId: data._id as string,
        date: values.date,
        serviceId: data.service._id as string,
        time: values.time,
      })
    ).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        setOpenModal(false);
      }
    });
  };
  watch;
  useEffect(() => {
    setValue("time", data?.time as string);
    setValue("date", new Date(data.date as string | number | Date));
  }, [data]);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <AlertDialog onOpenChange={setOpenModal} open={openModal}>
      <AlertDialogTrigger>
        <button className="h-8 px-3  flex-center bg-blue-500 rounded-lg text-sm text-white">
          Re schedule
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-full flex justify-between items-center ">
            <AlertDialogTitle>Update Booking</AlertDialogTitle>
            <AlertDialogCancel className="p-0 m-0 border-none bg-transparent hover:bg-transparent">
              <X className="w-5" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription>
            <form
              ref={formRef}
              onSubmit={handleSubmit(handleBookingSubmit)}
              className="w-full my-2 flex flex-col gap-3"
            >
              <div className="flex flex-col gap-1">
                <label className="text-sm text-black text-left">
                  Select Date
                </label>
                <Input
                  className="text-black"
                  value={watch("date")?.toISOString().split("T")[0] || ""}
                  onChange={(e) => {
                    setValue("date", new Date(e.target.value));
                    trigger("date");
                  }}
                  type="date"
                />
                {errors && errors?.date && (
                  <>
                    <span className="h-5 text-red-600 text-[12px] text-left">
                      {errors?.date?.message}
                    </span>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-black text-left">
                  Select Time
                </label>
                <Input
                  className="text-black"
                  value={watch("time")}
                  onChange={(e) => {
                    setValue("time", e.target.value);
                    trigger("time");
                  }}
                  type="time"
                />
                {errors && errors?.time && (
                  <>
                    <span className="h-5 text-red-600 text-[12px] text-left">
                      {errors?.time?.message}
                    </span>
                  </>
                )}
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            className={cn(
              "bg-colors-forground flex-center gap-2 hover:bg-colors-forground",
              {
                "pointer-events-none bg-colors-forground/80": loading,
              }
            )}
            onClick={handleSubmit(handleBookingSubmit)}
          >
            Submit Booking
            {loading && (
              <>
                <LoaderCircle className="w-4 animate-spin" />
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

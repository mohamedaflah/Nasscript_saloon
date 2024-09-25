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
import { LoaderButton } from "./loader-button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookingSchema } from "@/utils/schemas/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";
import { createBooking } from "@/redux/actions/booking.action";
import { useParams } from "react-router-dom";

export default function BookSaloonForm() {
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
  const { user } = useAppSelector((state) => state.user);
  const { propertyId } = useParams();

  const handleBookingSubmit = (values: z.infer<typeof bookingSchema>) => {
    dispatch(
      createBooking({
        ...values,
        userId: String(user?._id),
        serviceId: propertyId,
      })
    ).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        setOpenModal(false);
      }
    });
  };
  watch;
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <AlertDialog onOpenChange={setOpenModal} open={openModal}>
      <AlertDialogTrigger>
        <LoaderButton className="md:w-auto" loading={false}>
          Book Saloon
        </LoaderButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-full flex justify-between items-center ">
            <AlertDialogTitle>Book Saloon</AlertDialogTitle>
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

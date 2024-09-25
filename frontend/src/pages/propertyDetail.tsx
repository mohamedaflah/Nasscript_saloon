import BookSaloonForm from "@/components/app/BookSaloon";
import { LoaderButton } from "@/components/app/loader-button";
// import { checkUserBooking } from "@/redux/actions/booking.action";
import { createChatAction } from "@/redux/actions/chat.action";
import { getPropertyWithId } from "@/redux/actions/propertyAction";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { PrinterCheck } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const PropertyDetail = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: 0, behavior: "smooth" });
    }, 0);
  }, []);
  const dispatch = useAppDispatch();
  const { propertyId } = useParams();
  useEffect(() => {
    dispatch(getPropertyWithId(String(propertyId)));
  }, [dispatch, propertyId]);
  const navigate = useNavigate();
  const { property } = useAppSelector((state) => state.property);
  const { chatLoading } = useAppSelector((state) => state.chat);
  const { user, isVerified } = useAppSelector((state) => state.user);
  const { isBooked } = useAppSelector((state) => state.booking);
  // useEffect(() => {
  //   dispatch(
  //     checkUserBooking({
  //       userId: String(user?._id),
  //       serviceId: String(propertyId),
  //     })
  //   );
  // }, [user, propertyId, dispatch]);
  return (
    <main className="w-full h-screen">
      <section className="wrapper px-2 py-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="w-full flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <h1 className="font-bold text-3xl">{property?.title}</h1>
              </div>
              <div>
                <p className="font-medium leading-9">{property?.description}</p>
              </div>
            </div>
            <div className="w-full items-center justify-between text-colors-forground flex gap-4 mt-2">
              <h2 className="text-2xl font-bold text-colors-forground">
                {property?.price} QAR
              </h2>
              <div className="flex gap-2 font-bold">
                <PrinterCheck className="w-5" />
                <span className="capitalize">{property?.listingType}</span>
              </div>
            </div>
            <div className="flex justify-between sm:flex-row flex-col gap-4">
              <LoaderButton
                className="w-auto"
                onClick={() => {
                  if (!user?._id || !isVerified) {
                    toast.error("Please create an account");
                    navigate("/signup");
                  } else {
                    dispatch(
                      createChatAction({
                        firstId: user?._id as string,
                        secondId: property?.userId as string,
                      })
                    ).then((res) => {
                      if (res.type.endsWith("fulfilled")) {
                        navigate("/messages");
                      }
                    });
                  }
                }}
                loading={chatLoading}
              >
                Chat with Admin
              </LoaderButton>
              {!isVerified ? (
                <>
                  <LoaderButton
                    className="w-auto"
                    onClick={() => {
                      toast.error("Please Login or Register");
                      return navigate("/login");
                    }}
                  >
                    Book Saloon
                  </LoaderButton>
                </>
              ) : (
                <>
                  {isBooked ? (
                    <>
                      <LoaderButton
                        className="w-auto"
                        onClick={() =>
                          toast.success("You already booked for this service")
                        }
                      >
                        Booking is Pending
                      </LoaderButton>
                    </>
                  ) : (
                    <>
                      <BookSaloonForm />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {(property?.images as unknown as string[])?.map((img, Id) => (
            <div
              key={String(img + "" + Id)}
              className="w-full h-64 border shadow-md overflow-hidden rounded-sm"
            >
              <img src={img} className="w-full h-full object-cover" alt="" />
            </div>
          ))}
        </div>
        <div className="w-full mt-5 rounded-md   grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full border rounded-md flex flex-col gap-2 p-5">
            {property?.featuresAndAminity?.map((am, Id) => (
              <div
                key={String(am + Id)}
                className="w-full p-2 text-sm bg-slate-100 shadow-md border relative rounded-md text-wrap break-words pr-5"
              >
                {am}
              </div>
            ))}
          </div>
          <div className="w-full border rounded-md flex flex-col gap-2 p-5">
            {property?.otherProperty?.map((am, Id) => (
              <div
                key={String(am + Id)}
                className="w-full p-2 text-sm bg-slate-100 shadow-md border relative rounded-md text-wrap break-words pr-5"
              >
                {am}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

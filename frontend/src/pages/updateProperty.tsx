/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderButton } from "@/components/app/loader-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/constants/axiosInstance";
import { sellTypes } from "@/constants/property-data";
import { updateProperty } from "@/redux/actions/propertyAction";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { propertySchema } from "@/utils/schemas/property.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
export const UpdateProperty = () => {
  const {
    setValue,
    reset,
    watch,
    formState: { errors },
    trigger,
    handleSubmit,
    getValues,
  } = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      featuresAndAminity: [],
      images: [],
      listingType: "",
      otherProperty: [],
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.property);
  const handlePropertyUpdate = (values: z.infer<typeof propertySchema>) => {
    if (!user?._id) {
      return toast.error("Something went wrong please logout and login");
    }
    dispatch(
      updateProperty({
        propertyId: String(propertyId),
        sendPayload: { ...values, userId: String(user?._id) } as any,
        type: "normal",
      })
    ).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        navigate("/");
        reset({});
      }
    });
  };
  const { propertyId } = useParams();

  useEffect(() => {
    axiosInstance.get(`/property/${propertyId}`).then((res) => {
      setValue("title", String(res.data.property.title));

      setValue("listingType", String(res.data.property?.listingType));
      setValue("price", res.data.property?.price as number);
      setValue("description", String(res.data.property?.description));
      setValue("images", res.data.property?.images as (string | File)[]);
      setValue(
        "featuresAndAminity",
        res.data.property?.featuresAndAminity as string[]
      );
      setValue("otherProperty", res.data.property?.otherProperty as string[]);
    });
  }, [dispatch, propertyId]);
  const [aminity, setAminity] = useState<string>("");
  const [otherfeature, setOtherFeature] = useState<string>("");
  return (
    <main className="w-full min-h-screen  ">
      <form onSubmit={handleSubmit(handlePropertyUpdate)} className="wrapper ">
        <div className="w-full py-3">
          <h2 className="font-semibold text-2xl">Update Service / Product</h2>
        </div>
        <div className="w-full mt-3 grid grid-cols-1  gap-3">
          <div className="col-span-7 w-full rounded-lg border p-5">
            <div className="w-full ">
              <h2 className="font-semibold text-lg">Basic Information</h2>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-1 mt-3 gap-3">
              <div className="flex flex-col gap-1 ">
                <label htmlFor="" className="text-sm">
                  Service/Product title
                </label>
                <Input
                  onChange={(e) => {
                    setValue("title", e.target.value);
                    trigger("title");
                  }}
                  value={watch("title")}
                  placeholder="title.."
                  className="w-full"
                />
                <span className="text-red-600 text-sm">
                  {errors && errors.title && errors.title.message}
                </span>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-3 gap-3">
              <div className="flex flex-col gap-1 ">
                <label htmlFor="" className="text-sm">
                  Select listing type
                </label>
                <Select
                  onValueChange={(val) => {
                    setValue("listingType", val);
                    trigger("listingType");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={watch("listingType")} />
                  </SelectTrigger>
                  <SelectContent>
                    {sellTypes.map((val) => (
                      <SelectItem value={val} key={val} className="capitalize">
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-red-600 text-sm">
                  {errors && errors.listingType && errors.listingType.message}
                </span>
              </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="" className="text-sm">
                  Property Amount ﷼
                </label>
                <Input
                  placeholder="﷼ Amount"
                  className="w-full"
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value))) {
                      setValue("price", Number(e.target.value));
                      trigger("price");
                    }
                  }}
                  value={watch("price")}
                />
                <span className="text-red-600 text-sm">
                  {errors && errors.price && errors.price.message}
                </span>
              </div>
              {/* <div className="flex flex-col gap-1 ">
                <label htmlFor="" className="text-sm">
                  Select listing type
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="listing type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sellTypes.map((val) => (
                      <SelectItem value={val} className="capitalize">
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
              {/* <div className="flex flex-col gap-1 ">
                <label htmlFor="" className="text-sm">
                  Select publish status
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {publishStatus.map((val) => (
                      <SelectItem value={val} className="capitalize">
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            </div>
            <div className="mt-3 w-full">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm">
                  Description
                </label>
                <Textarea
                  onChange={(e) => {
                    setValue("description", e.target.value);
                    trigger("description");
                  }}
                  value={watch("description")}
                  className="w-full h-[100px] resize-none"
                  placeholder="description..."
                />
                <span className="text-red-600 text-sm">
                  {errors && errors.description && errors.description.message}
                </span>
              </div>
            </div>
          </div>
          {/* <div className="col-span-5 rounded-lg border p-5 w-full">
            <h1 className="font-semibold text-lg">Address</h1>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="" className="text-sm">
                City name
              </label>
              <Input
                placeholder="City.."
                onChange={(e) => {
                  setValue("address.city", e.target.value);
                  trigger("address.city");
                }}
                value={watch("address.city")}
                className="w-full"
              />
              <span className="text-red-600 text-sm">
                {errors && errors.address?.city && errors.address?.city.message}
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="" className="text-sm">
                State
              </label>
              <Input
                placeholder="State..."
                className="w-full"
                onChange={(e) => {
                  setValue("address.state", e.target.value);
                  trigger("address.state");
                }}
                value={watch("address.state")}
              />
              <span className="text-red-600 text-sm">
                {errors &&
                  errors.address?.state &&
                  errors.address?.state.message}
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="" className="text-sm">
                Country
              </label>
              <Input
                placeholder="country..."
                onChange={(e) => {
                  setValue("address.country", e.target.value);
                  trigger("address.country");
                }}
                value={watch("address.country")}
                className="w-full"
              />
              <span className="text-red-600 text-sm">
                {errors &&
                  errors.address?.country &&
                  errors.address?.country.message}
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="" className="text-sm">
                Zipcode
              </label>
              <Input
                placeholder="zipcode.."
                onChange={(e) => {
                  setValue("address.zipcode", e.target.value);
                  trigger("address.zipcode");
                }}
                value={watch("address.zipcode")}
                className="w-full"
              />
              <span className="text-red-600 text-sm">
                {errors &&
                  errors.address?.zipcode &&
                  errors.address?.zipcode.message}
              </span>
            </div>
          </div> */}
        </div>
        <div className="w-full border p-2 rounded-md mt-3 flex flex-col">
          <div className="w-full rounded-md  ">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="Imgs"
              name=""
              multiple
              onChange={(e) => {
                const files = e.target.files as unknown as any[];
                const existingFile = getValues("images");
                if (existingFile) {
                  setValue("images", [...existingFile, ...files]);
                } else {
                  setValue("images", [...files]);
                }
                trigger("images");
              }}
            />
            <label
              htmlFor="Imgs"
              className="h-32 flex-col w-full border rounded-md flex-center cursor-pointer"
            >
              <UploadCloud size={30} />
              <span className="text-sm">Click here to upload image</span>
            </label>
          </div>
          {watch("images") && watch("images").length > 0 && (
            <>
              <div className="w-full min-h-36 p-3 border rounded-md mt-3 grid xl:grid-cols-7 grid-cols-2 md:grid-cols-4 gap-3 lg:grid-cols-6">
                {watch("images")?.map((val, Id) => (
                  <div
                    key={Id}
                    className="h-56 w-full border rounded-md relative overflow-hidden"
                  >
                    <div className="absolute right-2 top-2 size-7 cursor-pointer bg-black/10 rounded-full  flex-center">
                      <X
                        onClick={() => {
                          const files = getValues("images").filter(
                            (_, I) => I !== Id
                          );
                          setValue("images", files);
                        }}
                        className="w-5 text-gray-300"
                      />
                    </div>
                    <img
                      src={
                        typeof val !== "string"
                          ? URL.createObjectURL(val as Blob | MediaSource)
                          : val
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          <span className="text-red-600 text-sm">
            {errors && errors.images && errors.images.message}
          </span>
        </div>
        <div className="mt-3 p-5 w-full border rounded-md">
          <div className="w-full ">
            <h2 className="font-semibold text-lg">Features and Aminities</h2>
          </div>
          <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 p-2">
            <div className="w-full border p-2 rounded-md flex flex-col gap-3">
              <div className="w-full flex h-10 gap-3">
                <Input
                  className="w-full"
                  placeholder="Amenities "
                  value={aminity}
                  onChange={(e) => {
                    setAminity(e.target.value);
                  }}
                />
                <Button
                  type="button"
                  className="bg-colors-forground"
                  onClick={() => {
                    if (aminity.trim()) {
                      const existingAminity = getValues("featuresAndAminity");
                      if (existingAminity) {
                        setValue("featuresAndAminity", [
                          ...existingAminity,
                          aminity,
                        ]);
                      } else {
                        setValue("featuresAndAminity", [aminity]);
                      }
                      trigger("featuresAndAminity");
                      setAminity("");
                    } else {
                      toast.error("fill amenities field");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <span className="text-red-600 text-sm">
                {errors &&
                  errors.featuresAndAminity &&
                  errors.featuresAndAminity.message}
              </span>
              <div className="w-full border rounded-md min-h-12 p-2 space-y-3">
                {watch("featuresAndAminity")?.map((am, Id) => (
                  <div
                    key={Id}
                    className="w-full p-2 text-sm bg-slate-100 shadow-md border relative rounded-md text-wrap break-words pr-5"
                  >
                    {am}
                    <X
                      className="w-4 cursor-pointer absolute right-2 top-2"
                      onClick={() => {
                        setValue(
                          "featuresAndAminity",
                          getValues("featuresAndAminity")?.filter(
                            (_, Idx) => Id !== Idx
                          )
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full border p-2 rounded-md flex flex-col gap-3">
              <div className="w-full flex h-10 gap-3">
                <Input
                  className="w-full"
                  placeholder="Other extra features"
                  value={otherfeature}
                  onChange={(e) => {
                    setOtherFeature(e.target.value);
                  }}
                />
                <Button
                  type="button"
                  className="bg-colors-forground"
                  onClick={() => {
                    if (otherfeature.trim()) {
                      const existingFeature = getValues("otherProperty");
                      if (existingFeature) {
                        setValue("otherProperty", [
                          ...existingFeature,
                          otherfeature,
                        ]);
                      } else {
                        setValue("otherProperty", [otherfeature]);
                      }
                      trigger("otherProperty");
                      setOtherFeature("");
                    } else {
                      toast.error("fill other property field");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <span className="text-red-600 text-sm">
                {errors && errors.otherProperty && errors.otherProperty.message}
              </span>
              <div className="w-full border rounded-md min-h-12 p-2 space-y-3">
                {watch("otherProperty")?.map((am, Id) => (
                  <div
                    key={Id}
                    className="w-full p-2 text-sm bg-slate-100 shadow-md border relative rounded-md text-wrap break-words pr-5"
                  >
                    {am}
                    <X
                      className="w-4 absolute right-2 top-2 cursor-pointer"
                      onClick={() => {
                        setValue(
                          "otherProperty",
                          getValues("otherProperty")?.filter(
                            (_, Idx) => Id !== Idx
                          )
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3  flex justify-end items-start h-20">
          <div className="w-48">
            <LoaderButton type="submit" loading={loading}>
              Submit
            </LoaderButton>
          </div>
        </div>
      </form>
    </main>
  );
};

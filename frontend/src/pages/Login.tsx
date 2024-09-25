/* eslint-disable @typescript-eslint/no-unused-expressions */
import { LoaderButton } from "@/components/app/loader-button";
import { PhoneInput } from "@/components/app/phone-input";

import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loginSchema } from "@/utils/schemas/login.schema";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "@/redux/actions/user.action";
export const Login = () => {
  const { loading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    dispatch(userLogin(values));
  };
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
    },
  });
  return (
    <main className="w-full h-screen flex-center overflow-hidden">
      <div className="rounded-lg border w-[90%] sm:w-[60%] md:w-[41%] lg:w-[32%] shadow-md p-10">
        <div className="w-full flex-center">
          <h1 className="font-semibold text-2xl">Welcome back 😍🖐</h1>
        </div>
        <form
          className="w-full flex flex-col mt-10 gap-3"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm">
              Mobile number
            </label>
            <PhoneInput
              onChange={(value) => {
                setValue("phoneNumber", value);
                trigger("phoneNumber");
              }}
            />
            <span className="text-red-600 text-[13px]">
              {errors && errors.phoneNumber && errors.phoneNumber.message}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm">
              Password
            </label>
            <div className="relative">
              <EyeIcon className="absolute right-2 top-3 w-5 text-gray-400" />
              <Input
                type="password"
                value={watch("password")}
                onChange={(e) => {
                  setValue("password", e.target.value);
                  trigger("password");
                }}
                className="h-12"
                placeholder="Enter password"
              />
            </div>
            <span className="text-red-600 text-[13px]">
              {errors &&
                errors.password &&
                errors.password.message?.replace("String", "Password")}
            </span>
          </div>
          <div className="flex flex-col gap-2 ">
            <LoaderButton loading={loading} type="submit">
              Login
            </LoaderButton>
            <div className="w-full flex justify-end">
              <span className="text-sm">
                Don't have an account{" "}
                <Link
                  className="text-colors-forground font-semibold"
                  to={"/signup"}
                >
                  Register
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

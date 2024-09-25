/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { LoaderButton } from "@/components/app/loader-button";
import { PhoneInput } from "@/components/app/phone-input";

import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signupSchema } from "@/utils/schemas/signup.schema";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "@/config/firebase.config";

import { useAppDispatch, useAppSelector } from "@/redux/store";
// import {
//   setConfirmationResult,
//   setUserLocally,
// } from "@/redux/reducers/user.reducer";
import { userSignup, validateUser } from "@/redux/actions/user.action";
import { IUser } from "@/types/user.types";
import toast from "react-hot-toast";
import { firebaseOtpErrorMessages } from "@/constants/error";

export const Signup = () => {
  const { loading, user } = useAppSelector((state) => state.user);
  const [localLoad, setLocalLoad] = useState<boolean>(false);
  const [otp, setOtp] = useState<boolean>(true);
  otp;
  const [searchParam, setSearchParam] = useSearchParams();
  setSearchParam;

  useEffect(() => {
    const param = searchParam.get("current");
    if (param == "otp") {
      setOtp(true);
    } else {
      setOtp(false);
    }
  }, [searchParam]);
  const {
    trigger,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [otpSentTime, setOtpSentTime] = useState<number | null>(null);
  const { verificationCheck } = useAppSelector((state) => state.user);
  otpSentTime;
  setOtpSentTime;
  const dispatch = useAppDispatch();
  const handleSignupSubmition = async (
    values: z.infer<typeof signupSchema>
  ) => {
    try {
      dispatch(validateUser(values)).then((res) => {
        if (res.type.endsWith("fulfilled")) {
          dispatch(userSignup({ ...values, role: "user" } as IUser));
        }
      });
    } catch (error: any) {
      return toast.error(error.message);
    }
  };
  const [otpcode, setOtpcode] = useState<string>("");
  const verifyOtp = async () => {
    try {
      setLocalLoad(true);
      await verificationCheck?.confirm(otpcode ? otpcode : "");
      dispatch(userSignup({ ...user, role: "user" } as IUser));
    } catch (error: any) {
      const errorMessage =
        firebaseOtpErrorMessages[
          error.code as keyof typeof firebaseOtpErrorMessages
        ] || firebaseOtpErrorMessages["default"];
      toast.error(errorMessage);
    } finally {
      setLocalLoad(false);
    }
  };
  return (
    <main className="w-full h-screen flex-center overflow-hidden">
      {verificationCheck ? (
        <>
          <div className="rounded-lg border w-[90%] sm:w-[60%] md:w-[41%] lg:w-[32%] shadow-md p-10">
            <div className="w-full flex-center">
              <h1 className="font-semibold text-2xl">Enter otp</h1>
            </div>
            <div className="w-full flex flex-col mt-10 gap-3">
              <div className="w-full flex justify-center ">
                <InputOTP maxLength={6} onChange={(value) => setOtpcode(value)}>
                  <InputOTPGroup className="flex gap-4">
                    <InputOTPSlot className="otp size-12" index={0} />
                    <InputOTPSlot className="otp size-12" index={1} />
                    <InputOTPSlot className="otp size-12" index={2} />
                    <InputOTPSlot className="otp size-12" index={3} />
                    <InputOTPSlot className="otp size-12" index={4} />
                    <InputOTPSlot className="otp size-12" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-col gap-2 ">
                <LoaderButton
                  onClick={() => verifyOtp()}
                  loading={loading || localLoad}
                  type="button"
                >
                  <span>Verify OTP</span>
                </LoaderButton>
                {/* <div className="w-full flex justify-end">
                  <span className="text-sm">
                    Already have an account{" "}
                    <Link
                      className="text-colors-forground font-semibold"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-lg border w-[90%] sm:w-[60%] md:w-[41%] lg:w-[32%] shadow-md p-10">
            <div className="w-full flex-center">
              <h1 className="font-semibold text-2xl">Create an new Account</h1>
            </div>
            <form
              onSubmit={handleSubmit(handleSignupSubmition)}
              className="w-full flex flex-col mt-10 gap-3"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm">
                  Username
                </label>
                <Input
                  onChange={(e) => {
                    setValue("username", e.target.value);
                    trigger("username");
                  }}
                  value={watch("username")}
                  type="text"
                  className="h-12"
                  placeholder="Enter your username"
                />
                <span className="text-red-600 text-[13px]">
                  {errors && errors.username && errors.username.message}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm">
                  Mobile number
                </label>
                <PhoneInput
                  onChange={(number) => {
                    setValue("phoneNumber", number);
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
                    onChange={(e) => {
                      setValue("password", e.target.value);
                      trigger("password");
                    }}
                    value={watch("password")}
                    className="h-12"
                    placeholder="Enter password"
                  />
                </div>
                <span className="text-red-600 text-[13px]">
                  {errors && errors.password && errors.password.message}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm">
                  Email address
                </label>
                <Input
                  type="email"
                  onChange={(e) => {
                    setValue("email", e.target.value);
                    trigger("email");
                  }}
                  value={watch("email")}
                  className="h-12"
                  placeholder="Enter email address"
                />
                <span className="text-red-600 text-[13px]">
                  {errors && errors.email && errors.email.message}
                </span>
              </div>
              <div className="w-full">
                <div id="recaptcha"></div>
              </div>
              <div className="flex flex-col gap-2 ">
                <LoaderButton type="submit" loading={loading || localLoad}>
                  Create account
                </LoaderButton>
                <div className="w-full flex justify-end">
                  <span className="text-sm">
                    Already have an account{" "}
                    <Link
                      className="text-colors-forground font-semibold"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  );
};

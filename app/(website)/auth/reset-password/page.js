"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zSchema } from "@/lib/zSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import z from "zod";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import {
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_REGISTER,
  WEBSITE_RESET_PASSWORD,
} from "@/lib/AdminPanelRoute";
import LoadingButton from "@/components/application/LoadingButton";
import axios from "axios";
import toast from "react-hot-toast";
import Otpverification from "@/components/application/Otpverification";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducer/authReducer";
import UpdatedPassword from "@/components/application/UpdatedPassword";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(false);
  const [otpEmail, setOtpEmail] = useState();
  const [isOtpVerified, setIsotpVerified] = useState(false);
  const formSchema = zSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResetPasswordSubmit = async (values) => {
    try {
      const { data: response } = await axios.post(
        "/api/auth/reset-password/send-otp",
        values,
      );
      if (!response.success) {
        throw new Error("Failed to login");
      }
      setOtpEmail(values.email);
      form.reset();
      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error(error.message);
      console.log("error", error.message);
    }
  };

  const handleOtpSubmit = async (values) => {
    try {
      const { data: response } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        values,
      );
      if (!response.success) {
        throw new Error("Failed to verify otp");
      }
      setIsotpVerified(true);
      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error(error.message);
      console.log("error", error.message);
    }
  };

  return (
    <div className=" w-full flex justify-center ">
      <Card className=" w-100 mt-10 shadow-lg shadow-black rounded-lg">
        <div className="flex justify-center text-3xl font-semibold">
          <h1>ResetPassword Form</h1>
        </div>

        {!otpEmail ? (
          <>
            {" "}
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleResetPasswordSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type={"email"}
                              placeholder="Please Enetr Your Email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <LoadingButton
                      className={
                        "w-full mb-4 cursor-pointer bg-black text-white hover:bg-black/40"
                      }
                      type="submit"
                      text="Send Otp"
                      loading={loading}
                    />
                    <div className="flex justify-center">
                      <button>
                        <Link
                          className="text-blue-400 hover:underline"
                          href={WEBSITE_LOGIN}
                        >
                          Back to login
                        </Link>
                      </button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
          <>
            {!isOtpVerified ? (
              <Otpverification
                email={otpEmail}
                onSubmit={handleOtpSubmit}
                loading={otpVerificationLoading}
              />
            ) : (
              <UpdatedPassword email={otpEmail} />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;

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
  ADMIN_DASHBOARD,
  USER_DASHBOARD,
  WEBSITE_REGISTER,
  WEBSITE_RESET_PASSWORD,
} from "@/lib/AdminPanelRoute";
import LoadingButton from "@/components/application/LoadingButton";
import axios from "axios";
import toast from "react-hot-toast";
import Otpverification from "@/components/application/Otpverification";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducer/authReducer";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const route = useRouter();

  const formSchema = zSchema
    .pick({
      emailOrPhone: true,
    })
    .extend({
      password: z.string().min(4, "4 digit required"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    try {
      const { data: response } = await axios.post("/api/auth/login", values);
      if (!response.success) {
        throw new Error("Failed to login");
      }

      form.reset();
      toast.success(response.message);

      route.push(
        response.data.role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD,
      );
      dispatch(login(response.data));
      return response;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" w-full flex justify-center ">
      <Card className=" w-100 mb-6 mt-2 shadow-lg shadow-black rounded-lg">
        {" "}
        <CardHeader className={"text-center"}>
          <CardTitle className={"text-2xl"}>Login Form</CardTitle>
          <CardDescription>Please Enter Your Credential</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLoginSubmit)}
              className="space-y-4"
            >
              <div>
                <FormField
                  control={form.control}
                  name="emailOrPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Or Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please Enetr Your Email Or Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className={"relative"}>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          placeholder="***********"
                          {...field}
                        />
                      </FormControl>
                      <button
                        onClick={() => setIsTypePassword(!isTypePassword)}
                        type="button"
                        className="absolute top-1/2  right-2 "
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <LoadingButton
                className={
                  "w-full cursor-pointer bg-black text-white hover:bg-black/40"
                }
                type="submit"
                text="Login"
                loading={loading}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-center">
            <div className="flex gap-2  px-4">
              <p>{`Don't Have a Account? `}</p>
              <Link
                className="text-blue-700 hover:underline cursor-pointer"
                href={WEBSITE_REGISTER}
              >
                Create a account
              </Link>
            </div>
            <Link
              className="text-blue-700 underline cursor-pointer"
              href={WEBSITE_RESET_PASSWORD}
            >
              Forget password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

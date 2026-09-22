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
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/application/LoadingButton";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { WEBSITE_LOGIN } from "@/lib/AdminPanelRoute";
import z from "zod";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const route = useRouter();
  const formSchema = zSchema
    .pick({
      name: true,
      emailOrPhone: true,
      password: true,
    })
    .extend({
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "password and ConfirmPassword must be same",
      path: ["confirm"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emailOrPhone: "",
      password: "",
      confirm: "",
    },
  });

  const handleRegistrationSubmit = async (values) => {
    try {
      setLoading(true);

      const { data: response } = await axios.post("/api/auth/register", values);

      if (!response.success) {
        throw new Error(response.message || "Registration failed");
      }

      console.log(response);

      toast.success(response.message);

      form.reset();

      route.push("/auth/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full flex justify-center items-center ">
      <Card className="h-130 mt-2 mb-4 w-100 shadow-lg shadow-black rounded-lg">
        <CardHeader className={"text-center"}>
          <CardTitle className={"text-2xl"}>Registration Form</CardTitle>
          <CardDescription>Please register your name</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegistrationSubmit)}
              className="space-y-4"
            >
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type={"text"}
                          placeholder="Please Enetr Your Name"
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
                  name="emailOrPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email or phone" {...field} />
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
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="Please Enetr Your Password"
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
                  name="confirm"
                  render={({ field }) => (
                    <FormItem className={"relative"}>
                      <FormLabel>Confirm Password</FormLabel>
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
                text="Register"
                loading={loading}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className={"flex justify-center gap-2"}>
          <p>Already Have a Account? </p>
          <Link
            className="text-blue-700 hover:underline cursor-pointer"
            href={WEBSITE_LOGIN}
          >
            Go to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;

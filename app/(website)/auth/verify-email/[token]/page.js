"use client";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import verifiedEmail from "@/public/verified.gif";
import notverifiedEmail from "@/public/verification-failed.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_REGISTER,
} from "@/lib/AdminPanelRoute";

const VerificationEmailLink = ({ params }) => {
  const [isVerified, setIsverified] = useState(false);
  const { token } = React.use(params);

  useEffect(() => {
    const verify = async () => {
      const { data: getVerification } = await axios.post(
        "/api/auth/verify-email",
        { token },
      );
      if (getVerification.success) {
        setIsverified(true);
      }
    };
    verify();
  }, [token]);

  return (
    <div className="my-10 w-full flex justify-center items-center">
      <Card className={"w-100"}>
        <CardContent>
          {isVerified ? (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={verifiedEmail}
                  alt="Image"
                  height={200}
                  width={200}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold my-5 text-green-500 text-center">
                  Email Verification Successful
                </h1>
                <Button asChild className={"flex justify-center items-center"}>
                  <Link href={WEBSITE_LOGIN}>Go to Login</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={notverifiedEmail}
                  alt="Image"
                  height={200}
                  width={200}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold my-5 text-green-500 text-center">
                  Email Verification Failed
                </h1>
                <Button asChild className={"flex justify-center items-center"}>
                  <Link href={WEBSITE_REGISTER}>Verify Your Email</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationEmailLink;

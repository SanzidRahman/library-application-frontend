"use client";

import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import user from "@/public/user.png";
import Link from "next/link";

import {
    USER_DASHBOARD,
    WEBSITE_LOGIN,
    WEBSITE_REGISTER,
} from "@/lib/AdminPanelRoute";
import Logout from "../admin/Logout";

const UserAccount = () => {
    const auth = useSelector((store) => store.authStore);
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            {!auth.auth ? (
                <div className="relative group">
                    {/* Mobile Click + Desktop Hover */}
                    <button onClick={() => setOpen(!open)} className="cursor-pointer">
                        <MdOutlineAccountCircle size={25} />
                    </button>

                    <div
                        className={`
              absolute right-0 top-10 z-50 w-44 rounded-xl border bg-white p-2 shadow-xl
              transition-all duration-200

              ${open
                                ? "opacity-100 visible translate-y-0"
                                : "opacity-0 invisible translate-y-2"
                            }

              lg:opacity-0 lg:invisible lg:translate-y-2
              lg:group-hover:opacity-100
              lg:group-hover:visible
              lg:group-hover:translate-y-0
            `}
                    >
                        <Link
                            href={WEBSITE_LOGIN}
                            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                        >
                            Login
                        </Link>

                        <Link
                            href={WEBSITE_REGISTER}
                            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="relative group">
                    {/* Mobile Click + Desktop Hover */}
                    <button onClick={() => setOpen(!open)} className="cursor-pointer">
                        <Image
                            src={user}
                            alt="User Image"
                            height={35}
                            width={35}
                            className="rounded-full object-cover"
                        />
                    </button>

                    <div
                        className={`
              absolute right-0 top-10 z-50 w-44 rounded-xl border bg-white p-2 shadow-xl
              transition-all duration-200

              ${open
                                ? "opacity-100 visible translate-y-0"
                                : "opacity-0 invisible translate-y-2"
                            }

              lg:opacity-0 lg:invisible lg:translate-y-2
              lg:group-hover:opacity-100
              lg:group-hover:visible
              lg:group-hover:translate-y-0
            `}
                    >
                        <Link
                            href={USER_DASHBOARD}
                            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                        >
                            Dashboard
                        </Link>

                        <div
                            className="rounded-lg px-4 py-2 hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                        >
                            <Logout />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAccount;

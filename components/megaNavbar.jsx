"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { MdOutlineAccountCircle } from "react-icons/md";

import useFetch from "@/hooks/useFetch";
import Cart from "./Cart";
import MenuSection from "./MenuSection";

export default function MegaNavbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const { data: response, loading } = useFetch(
        "http://localhost:8000/api/mega-menu"
    );

    const menuData = response?.data || {
        categories: [],
        authors: [],
        publishers: [],
    };

    return (
        <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-bold text-green-600"
                    >
                        Library
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {!loading && (
                            <>
                                <MenuSection
                                    title="Categories"
                                    items={menuData.categories}
                                    queryKey="category"
                                    activeMenu={activeMenu}
                                    setActiveMenu={setActiveMenu}
                                />

                                <MenuSection
                                    title="Authors"
                                    items={menuData.authors}
                                    queryKey="author"
                                    activeMenu={activeMenu}
                                    setActiveMenu={setActiveMenu}
                                />

                                <MenuSection
                                    title="Publishers"
                                    items={menuData.publishers}
                                    queryKey="publisher"
                                    activeMenu={activeMenu}
                                    setActiveMenu={setActiveMenu}
                                />
                                <Link href={'/all-books'}>All Books</Link>
                            </>
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        <Cart />

                        <MdOutlineAccountCircle
                            size={26}
                            className="cursor-pointer text-green-700"
                        />

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu size={26} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[999] bg-white overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-bold">Menu</h2>

                        <button onClick={() => setMobileOpen(false)}>
                            <X size={28} />
                        </button>
                    </div>

                    <div className="p-4 space-y-8">
                        {/* Categories */}
                        <div>
                            <h3 className="mb-3 font-bold text-green-700">
                                Categories
                            </h3>

                            <div className="space-y-2">
                                {menuData.categories.map((item) => (
                                    <Link
                                        key={item._id}
                                        href={`/books?category=${item._id}`}
                                        onClick={() =>
                                            setMobileOpen(false)
                                        }
                                        className="block py-2 border-b"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Authors */}
                        <div>
                            <h3 className="mb-3 font-bold text-green-700">
                                Authors
                            </h3>

                            <div className="space-y-2">
                                {menuData.authors.map((item) => (
                                    <Link
                                        key={item._id}
                                        href={`/books?author=${item._id}`}
                                        onClick={() =>
                                            setMobileOpen(false)
                                        }
                                        className="block py-2 border-b"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Publishers */}
                        <div>
                            <h3 className="mb-3 font-bold text-green-700">
                                Publishers
                            </h3>

                            <div className="space-y-2">
                                {menuData.publishers.map((item) => (
                                    <Link
                                        key={item._id}
                                        href={`/books?publisher=${item._id}`}
                                        onClick={() =>
                                            setMobileOpen(false)
                                        }
                                        className="block py-2 border-b"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
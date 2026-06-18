"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { MdOutlineAccountCircle } from "react-icons/md";
import Cart from "./Cart";


export default function MegaNavbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const { data: response, loading } = useFetch("http://localhost:8000/api/mega-menu")
    const menuData = response?.data || { categories: [], authors: [], publishers: [] };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }




    const renderSection = (title, items, type, keyField) => (
        <div className="relative">
            <button
                onMouseEnter={() => setActiveMenu(type)}
                className="flex items-center gap-1 font-medium hover:text-green-600"
            >
                {title}
                <ChevronDown size={16} />
            </button>

            {activeMenu === type && (
                <div
                    className=" fixed left-1/2 top-16 -translate-x-1/2 z-50 w-[95vw] max-w-7xl max-h-[75vh] overflow-y-auto  border bg-white p-6 shadow-xl"
                    onMouseEnter={() => setActiveMenu(type)}
                    onMouseLeave={() => setActiveMenu(null)}
                >
                    {/* Desktop Grid */}
                    <div className="hidden lg:grid grid-cols-5 gap-6">
                        {items.map((item) => (
                            <div key={item._id} className="rounded-lg border p-2 hover:bg-gray-50">
                                <h3 className="font-semibold text-green-700 mb-2">
                                    {item[keyField]}
                                </h3>
                                <ul className="space-y-1">
                                    {item.books?.slice(0, 6).map((book) => (
                                        <li key={book._id}>
                                            <Link
                                                href={`/books/${book._id}`}
                                                className="text-sm text-gray-700 hover:text-green-600 truncate block"
                                            >
                                                {book.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Drawer Style */}
                    <div className="lg:hidden fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
                        <button
                            onClick={() => setActiveMenu(null)}
                            className="mb-4 text-red-600 font-semibold"
                        >
                            Close
                        </button>
                        <h2 className="text-xl font-bold mb-4">{title}</h2>
                        {items.map((item) => (
                            <div key={item._id} className="border-b pb-2 mb-3">
                                <h3 className="font-semibold text-green-700 mb-1">
                                    {item[keyField]}
                                </h3>
                                <ul className="space-y-1">
                                    {item.books?.map((book) => (
                                        <li key={book._id}>
                                            <Link
                                                href={`/books/${book._id}`}
                                                className="text-sm text-gray-700 hover:text-green-600 truncate block"
                                            >
                                                {book.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-green-600">
                        Library
                    </Link>

                    {/* Mega Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {renderSection("Categories", menuData.categories, "categories", "category")}
                        {renderSection("Authors", menuData.authors, "authors", "author")}
                        {renderSection("Publishers", menuData.publishers, "publishers", "publisher")}
                        <Link href={"/fundamental-books"}> Fundamental</Link>
                        <Link href={"/new-books"}> New Books</Link>
                        <Link href={"/all-books"}> All Books</Link>
                    </div>

                    {/* Shopping cart */}
                    <div className="flex gap-2">
                        <Cart />
                        <MdOutlineAccountCircle size={25} className="text-green-700 cursor-pointer" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

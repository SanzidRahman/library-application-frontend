"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function MenuSection({
    title,
    items,
    queryKey,
    activeMenu,
    setActiveMenu,
}) {
    const timeoutRef = useRef();

    const openMenu = (menu) => {
        clearTimeout(timeoutRef.current);
        setActiveMenu(menu);
    };

    const closeMenu = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 200);
    };
    console.log(items)
    return (
        <div
            className="relative"
            onMouseEnter={() => openMenu(title)}
            onMouseLeave={closeMenu}
        >
            <button
                type="button"
                onMouseEnter={() => setActiveMenu(title)}
                className="flex items-center gap-1 font-medium hover:text-green-600"
            >
                {title}
                <ChevronDown size={16} />
            </button>



            {activeMenu === title && (

                <div
                    className="fixed left-1/2 top-16 z-50 w-[95vw] max-w-7xl -translate-x-1/2 border bg-white p-6 shadow-xl"
                    onMouseEnter={() => setActiveMenu(title)}
                    onMouseLeave={() => setActiveMenu(null)}
                >
                    {/* menu content */}
                    <h3 className="mb-4 text-lg font-bold text-green-700">
                        {title}
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {items.map((item) => (
                            <Link
                                key={item._id}
                                href={`/books?${queryKey}=${item._id}`}
                                className="rounded border p-3 transition hover:border-green-500 hover:bg-green-50"
                            >
                                <div className="font-medium">
                                    {item.name}
                                </div>

                                {item.count && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        {item.count} books
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>


            )}
        </div>
    );
}
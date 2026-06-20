"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const router = useRouter();
    const wrapperRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // Search API
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!searchTerm.trim()) {
                setResults([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const res = await fetch(
                    `${API_URL}/api/search?q=${encodeURIComponent(
                        searchTerm
                    )}`
                );

                const data = await res.json();

                setResults(data.data || []);
                setShowDropdown(true);
            } catch (error) {
                console.error(error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        router.push(
            `/books?q=${encodeURIComponent(searchTerm)}`
        );

        setShowDropdown(false);
    };

    return (
        <div
            ref={wrapperRef}
            className="relative mx-auto max-w-2xl"
        >
            <form
                onSubmit={handleSubmit}
                className="flex overflow-hidden rounded-xl bg-white"
            >
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    onFocus={() => setShowDropdown(true)}
                    className="w-full px-4 py-4 text-black outline-none"
                />

                <button
                    type="submit"
                    className="bg-indigo-600 px-8 text-white"
                >
                    Search
                </button>
            </form>

            {showDropdown && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border bg-white shadow-lg">
                    {loading && (
                        <div className="p-4 text-center text-gray-500">
                            Searching...
                        </div>
                    )}

                    {!loading &&
                        results.length > 0 &&
                        results.map((book) => (
                            <Link
                                key={book._id}
                                href={`/books/${book.slug || book._id}`}
                                onClick={() =>
                                    setShowDropdown(false)
                                }
                                className="flex items-center gap-3 border-b p-3 hover:bg-gray-100"
                            >


                                <div>
                                    <h4 className="font-medium text-black">
                                        {book.title}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        {book.author?.name}
                                    </p>
                                </div>
                            </Link>
                        ))}

                    {!loading &&
                        searchTerm &&
                        results.length === 0 && (
                            <div className="p-4 text-center text-gray-500">
                                No books found
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}
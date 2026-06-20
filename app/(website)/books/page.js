"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { API_URL } from "@/lib/api";

const BooksPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [query, setQuery] = useState("");

    const category = searchParams.get("category");
    const author = searchParams.get("author");
    const publisher = searchParams.get("publisher");
    const search = searchParams.get("search");
    const page = searchParams.get("page") || 1;

    // build API URL dynamically
    const apiUrl = `${API_URL}/api/books?category=${category || ""}&author=${author || ""}&publisher=${publisher || ""}&search=${search || ""}&page=${page}`;

    const { data, loading } = useFetch(apiUrl);

    const books = data?.data || [];

    // ---------------- SEARCH HANDLER ----------------
    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (query) {
            params.set("search", query);
        } else {
            params.delete("search");
        }

        params.set("page", 1);

        router.push(`/books?${params.toString()}`);
    };



    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* SEARCH BOX */}
            <div className="flex gap-2 mb-6">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search books..."
                    className="border p-2 w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-600 text-white px-4"
                >
                    Search
                </button>
            </div>

            {/* BOOK GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {books.map((book) => (
                    <Link
                        key={book._id}
                        href={`/books/${book._id}`}
                        className="border p-3 hover:shadow"
                    >
                        <h3 className="font-medium">{book.title}</h3>

                        <p className="text-xs text-gray-500">
                            {book.category.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BooksPage;
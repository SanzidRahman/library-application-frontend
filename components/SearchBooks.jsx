'use client'

import useFetch from "@/hooks/useFetch";
import Link from "next/link"
import { useState } from "react";

const SearchBooks = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: response, loading } = useFetch("http://localhost:8000/api/mega-menu")
    const menuData = response?.data || { categories: [], authors: [], publishers: [] };
    // search books
    const allBooks = [
        ...menuData.categories.flatMap((item) => item.books || []),
        ...menuData.authors.flatMap((item) => item.books || []),
        ...menuData.publishers.flatMap((item) => item.books || []),
    ];

    // Remove duplicates
    const uniqueBooks = Array.from(
        new Map(allBooks.map((book) => [book._id, book])).values()
    );

    const filteredBooks = searchTerm
        ? uniqueBooks.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];
    return (
        <div className="relative hidden md:block">
            <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-72 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />


            {searchTerm && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.slice(0, 10).map((book) => (
                            <Link
                                key={book._id}
                                href={`/books/${book._id}`}
                                onClick={() => setSearchTerm("")}
                                className="block px-4 py-3 hover:bg-green-50 border-b last:border-b-0"
                            >
                                <p className="font-medium text-gray-800">
                                    {book.title}
                                </p>

                                {book.author && (
                                    <p className="text-xs text-gray-500">
                                        {book.author}
                                    </p>
                                )}
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No books found
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBooks
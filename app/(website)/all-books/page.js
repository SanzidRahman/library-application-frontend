"use client";

import BookCard from "@/components/BookCard";
import FilterContent from "@/components/FilterContent";
import { useBooks } from "@/hooks/useBooks";
import { FiFilter, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useFilters } from "@/hooks/useFilter";
import { useRouter, useSearchParams } from "next/navigation";

export default function BooksPage() {
    // Filter Management
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page") || 1);
    const category = searchParams.get("category") || "";
    const author = searchParams.get("author") || "";
    const publisher = searchParams.get("publisher") || "";
    const sort = searchParams.get("sort") || "";
    const maxPrice = Number(searchParams.get("maxPrice") || 5000);
    const urlSearch = searchParams.get("search") || "";

    const [search, setSearch] = useState(urlSearch);
    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {
        setSearch(urlSearch);
    }, [urlSearch]);

    useEffect(() => {
        const currentSearch = searchParams.get("search") || "";

        if (currentSearch === debouncedSearch) return;

        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch.trim()) {
            params.set("search", debouncedSearch.trim());
        } else {
            params.delete("search");
        }

        params.set("page", "1");

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, router]);

    const updateParams = (key, value) => {

        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        if (key !== "page") {
            params.set("page", "1");
        }

        router.push(`?${params.toString()}`);
    };


    const resetFilters = () => {
        router.push("?");
        setSearch("");
    };

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // API Call
    const { data, isLoading } = useBooks({
        page,
        category,
        author,
        publisher,
        search: debouncedSearch,
        maxPrice,
        sort,
    });

    const books = data?.data || [];

    const { data: filters, isLoading: filtersLoading
    } = useFilters();

    const categories = filters?.categories || [];
    const authors = filters?.authors || [];
    const publishers = filters?.publishers || [];

    // Props for FilterContent
    const filterProps = {
        search,
        setSearch,
        category,
        author,
        publisher,
        sort,
        maxPrice,
        categories,
        authors,
        publishers,
        updateParams,
        resetFilters,
    };

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Mobile Filter */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
                >
                    <FiFilter />
                    Filters
                </button>
            </div>

            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 bg-black/50">
                    <div className="absolute left-0 top-0 h-full w-80 bg-white p-5 overflow-y-auto">
                        <div className="flex justify-between mb-5">
                            <h2 className="font-bold text-xl">Filters</h2>

                            <button
                                onClick={() =>
                                    setMobileFilterOpen(false)
                                }
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <FilterContent {...filterProps} />
                    </div>
                </div>
            )}

            <div className="grid gap-8 lg:grid-cols-4">
                {/* Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 bg-white shadow rounded-xl p-5">
                        <h2 className="text-xl font-bold mb-5">
                            Filters
                        </h2>

                        <FilterContent {...filterProps} />
                    </div>
                </aside>

                {/* Books */}
                <section className="lg:col-span-3">
                    <div className="flex justify-between mb-6">
                        <h1 className="text-3xl font-bold">
                            All Books
                        </h1>

                        <div className="text-gray-500">
                            {books.length} Books
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-80 bg-gray-200 animate-pulse rounded-xl"
                                />
                            ))}
                        </div>
                    ) : books.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold">
                                No Books Found
                            </h2>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {books.map((book) => (
                                <BookCard
                                    key={book._id}
                                    book={book}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
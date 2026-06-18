"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useBookFilters = () => {
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

    return {
        page,
        category,
        author,
        publisher,
        sort,
        maxPrice,
        search,
        setSearch,
        updateParams,
        resetFilters,
    };
};
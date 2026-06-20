import axios from "axios";
import { API_URL } from "./api";

export const getFilters = async () => {
    const res = await axios.get(`${API_URL}/api/filters`);
    return res.data.data;
}

export const getFeaturedBooks = async () => {
    try {
        const res = await fetch(
            `${API_URL}/api/books?limit=8&sort=newest`,
            {
                next: {
                    revalidate: 60,
                },

            }

        );
        if (!res.ok) {
            throw new Error("Failed to fetch books");
        }

        const data = await res.json();

        return data.data || [];
    } catch {
        return [];
    }
}


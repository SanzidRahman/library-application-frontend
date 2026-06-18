import axios from "axios";

export const getFilters = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/filters`);
    return res.data.data;
}

export const getFeaturedBooks = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/books?limit=8&sort=newest`,
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


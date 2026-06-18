import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useBooks = (params) => {
    return useQuery({
        queryKey: ["books", params], // ✅ cache per filter set

        queryFn: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/books/`,
                { params }
            );
            return data;
        },
        keepPreviousData: true, // ✅ smooth pagination/filter transitions
    });
};


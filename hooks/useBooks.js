import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/api";

export const useBooks = (params) => {
    return useQuery({
        queryKey: ["books", params], // ✅ cache per filter set

        queryFn: async () => {
            const { data } = await axios.get(
                `${API_URL}/api/books/`,
                { params }
            );
            return data;
        },
        keepPreviousData: true, // ✅ smooth pagination/filter transitions
    });
};


import { getFilters } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";


export const useFilters = () => {
    return useQuery({
        queryKey: ["filters"],
        queryFn: getFilters,
        staleTime: 1000 * 60 * 30, // 30 minutes
    });
};
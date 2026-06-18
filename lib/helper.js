import axios from "axios";

export const getFilters = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/filters`);
    return res.data.data;
}
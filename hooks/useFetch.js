"use client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const useFetch = (url, method = "GET", option = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(null);
    const [refreshIndex, setRefreshIndex] = useState(0);

    const optionString = JSON.stringify(option);

    const requestOption = useMemo(() => {
        const opts = { ...option };
        if (method === "POST" && !opts.data) {
            opts.data = {};
        }
        return opts;
    }, [method, optionString]);

    useEffect(() => {
        const apiCall = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: response } = await axios({
                    url,
                    method,
                    ...requestOption,
                });
                if (!response.success) {
                    throw new Error(response.message);
                }
                setData(response);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
                );
            } finally {
                setLoading(false);
            }
        };
        apiCall();
    }, [url, refreshIndex, method, requestOption]);

    const refetch = () => {
        setRefreshIndex((prev) => prev + 1);
    };

    return { data, refetch, error, loading };
};

export default useFetch;

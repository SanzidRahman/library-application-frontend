"use client";

import { useMemo, useState } from "react";
import axios from "axios";

import { Breadcrumb } from "@/components/Breadcrumb";
import Select from "@/components/Select";
import useFetch from "@/hooks/useFetch";
import { ADMIN_BOOKS_ADD } from "@/lib/AdminPanelRoute";
import Image from "next/image";
import { API_URL } from "@/lib/api";

const BooksAddPage = () => {
    const [preview, setPreview] = useState("");
    const breadcrumbItems = [
        { label: "Admin Dashboard", href: "/admin/dashboard" },
        { label: "Add Books", href: ADMIN_BOOKS_ADD },
    ];

    const { data: getCategory } = useFetch(`${API_URL}/api/categories`);
    const { data: getPublisher } = useFetch(`${API_URL}/api/publishers`);
    const { data: getAuthor } = useFetch(`${API_URL}/api/authors`);



    // Category Options
    const categoryOptions = useMemo(() => {
        return getCategory?.success
            ? getCategory.data.map((item) => ({
                label: item.name,
                value: item._id,
            }))
            : [];
    }, [getCategory]);

    // Publisher Options
    const publisherOptions = useMemo(() => {
        return getPublisher?.success
            ? getPublisher.data.map((item) => ({
                label: item.name,
                value: item._id,
            }))
            : [];
    }, [getPublisher]);

    // Author Options
    const authorOptions = useMemo(() => {
        return getAuthor?.success
            ? getAuthor.data.map((item) => ({
                label: item.name,
                value: item._id,
            }))
            : [];
    }, [getAuthor]);

    // State
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        author: "",
        publisher: "",
        publicationYear: "",
        price: "",
        discountPercentage: "",
        discountPrice: "",
        picture: null, // 👈 add
    });


    // Handle Media
    const handleMediaChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData((prev) => ({
                ...prev,
                picture: file,
            }));

            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle Change
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]:
                    type === "number"
                        ? value === ""
                            ? ""
                            : Number(value)
                        : value,
            };

            // ✅ Calculate discountPercentage whenever price or discountPrice changes
            if (updated.price && updated.discountPrice) {
                const discount =
                    ((updated.price - updated.discountPrice) / updated.price) * 100;
                updated.discountPercentage = discount.toFixed(2); // keep 2 decimals
            } else {
                updated.discountPercentage = "";
            }

            return updated;
        });
    };


    // handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("author", formData.author);
            data.append("publisher", formData.publisher);
            data.append("publicationYear", formData.publicationYear);
            data.append("price", formData.price);
            data.append("discountPrice", formData.discountPrice);
            data.append(
                "discountPercentage",
                formData.discountPercentage
            );

            if (formData.picture) {
                data.append("picture", formData.picture);
            }

            const res = await axios.post(`${API_URL}/api/books`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.status !== 201) {
                throw new Error("Book creation failed");
            }

            alert("Book created successfully!");

            setFormData({
                title: "",
                category: "",
                author: "",
                publisher: "",
                publicationYear: "",
                price: "",
                discountPercentage: "",
                discountPrice: "",
                picture: null,
            });

            setPreview("");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong!"
            );
        }
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-5xl p-6 bg-white rounded-lg shadow">
                <h2 className="mb-6 text-2xl font-bold">
                    Add New Book
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-4 rounded bg-gray-900 p-6 text-white md:grid-cols-3"
                >
                    {/* Title */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 text-white"
                            required
                        />
                    </div>

                    {/* Publication Year */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Publication Year
                        </label>

                        <input
                            type="number"
                            name="publicationYear"
                            value={formData.publicationYear}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 text-white"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Category
                        </label>

                        <Select
                            options={categoryOptions}
                            selected={formData.category}
                            setSelected={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    category: value,
                                }))
                            }
                            placeholder="Select Category"
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Author
                        </label>

                        <Select
                            options={authorOptions}
                            selected={formData.author}
                            setSelected={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    author: value,
                                }))
                            }
                            placeholder="Select Author"

                        />
                    </div>

                    {/* Publisher */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Publisher
                        </label>

                        <Select
                            options={publisherOptions}
                            selected={formData.publisher}
                            setSelected={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    publisher: value,
                                }))
                            }
                            placeholder="Select Publisher"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 text-white"
                            required
                        />
                    </div>

                    {/* Book Cover */}
                    <div className="">
                        <label className="mb-1 block text-sm font-medium">
                            Book Cover
                        </label>

                        <input
                            type="file"
                            name="picture"
                            accept="image/*"
                            onChange={handleMediaChange}
                            className="w-full rounded border px-3 py-2 text-white"
                        />

                        {preview && (
                            <Image
                                src={preview}
                                alt="Preview"
                                height={200}
                                width={200}
                                className="mt-3 h-40 w-32 rounded border object-cover"
                            />
                        )}
                    </div>

                    {/* Discount Price */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Discount Price
                        </label>

                        <input
                            type="number"
                            name="discountPrice"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2 text-white"
                        />
                    </div>

                    {/* Discount Percentage (read-only) */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Discount Percentage
                        </label>

                        <input
                            type="text"
                            name="discountPercentage"
                            value={formData.discountPercentage}
                            readOnly
                            className="w-full rounded border px-3 py-2 text-white bg-gray-700"
                        />
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-3">
                        <button
                            type="submit"
                            className="w-full rounded bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
                        >
                            Submit Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BooksAddPage;
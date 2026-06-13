"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { ADMIN_AUTHORS_ADD, ADMIN_CATEGORY_ADD } from "@/lib/AdminPanelRoute";
import axios from "axios";
import { useState } from "react";

const AuthorsAddPage = () => {
    const breadcrumbItems = [
        { label: "Admin-Dashboard", href: "/admin/dashboard" },
        { label: "Add-Authors", href: ADMIN_AUTHORS_ADD },
    ];

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
    });

    // Generate slug automatically when name changes (supports Bangla + English)
    const generateSlug = (text) =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^a-z০-৯অ-ঔক-হ\s-]/g, "") // বাংলা অক্ষর + সংখ্যা + ইংরেজি অক্ষর রাখে
            .replace(/\s+/g, "-") // স্পেসকে "-" এ রূপান্তর করে
            .replace(/-+/g, "-"); // একাধিক "-" কে একটি করে দেয়

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setFormData({
                name: value,
                slug: generateSlug(value),
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `http://localhost:8000/api/authors`,
                formData
            );

            if (res.status !== 201 && !res.data) {
                throw new Error("Category creation failed");
            }

            alert("Category created successfully!");
            setFormData({ name: "", slug: "" });
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-6">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-md bg-gray-900 text-white p-6 rounded shadow space-y-4"
                >
                    <h2 className="text-xl font-bold">Add Authors</h2>

                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            readOnly
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 opacity-70 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Slug is generated automatically from the name.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
                    >
                        Save Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthorsAddPage;

"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { ADMIN_MEDIA_ADD } from "@/lib/AdminPanelRoute";
import { API_URL } from "@/lib/api";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const Media = () => {
    const breadcrumbItems = [
        { label: "Admin-Dashboard", href: "/admin/dashboard" },
        { label: "Add-Media", href: ADMIN_MEDIA_ADD },
    ];

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);

        // image preview
        if (selectedFile.type.startsWith("image")) {
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setPreview("");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Select a file first");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("picture", file);

            const response = await axios.post(
                `${API_URL}/api/media/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percent);
                    },
                }
            );

            setUploadedFile(response.data.file);

            // ✅ Reset everything after successful upload
            setFile(null);
            setPreview("");
            setProgress(0);
            setUploadedFile(null);

            // also clear the file input value
            document.querySelector('input[type="file"]').value = "";

            alert("Upload successful!");
        } catch (error) {
            console.error(error);
            alert("Upload Failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-6">
                <div className="max-w-2xl border p-10">
                    <h1 className="text-3xl text-center mt-4 font-bold mb-6">
                        Media Upload
                    </h1>

                    <div className="border-2 border-dashed rounded-lg p-6">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border p-2 w-full"
                        />

                        {preview && (
                            <Image
                                src={preview}
                                alt="Preview"
                                height={300}
                                width={300}
                                className="mt-4 rounded-lg w-full h-72 object-cover"
                            />
                        )}

                        {file && (
                            <div className="mt-4">
                                <p><strong>Name:</strong> {file.name}</p>
                                <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                <p><strong>Type:</strong> {file.type}</p>
                            </div>
                        )}

                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="mt-6 bg-blue-600 w-20 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>

                    {uploading && (
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-green-500 h-3 rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="mt-2">{progress}%</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Media;

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ADMIN_MEDIA_ADD } from "@/lib/AdminPanelRoute";
import { API_URL } from "@/lib/api";

const MediaGallery = () => {
  const breadcrumbItems = [
    { label: "Admin-Dashboard", href: "/admin/dashboard" },
    { label: "Media-Gallery", href: ADMIN_MEDIA_ADD },
  ];

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/media`);
        // ✅ Use response.data.media because your API wraps images inside "media"
        setImages(response.data.media);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-6">
        <h1 className="text-3xl text-center mt-4 font-bold mb-6">
          Media Gallery
        </h1>

        {loading ? (
          <p className="text-center">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-center">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img._id}
                className="border rounded-lg overflow-hidden shadow"
              >
                <Image
                  src={img.secureUrl} // ✅ use secureUrl for HTTPS
                  alt="Uploaded Media"
                  width={200}
                  height={200}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2 text-center">
                  <p className="text-sm text-gray-500">
                    Uploaded: {new Date(img.createdAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    Resource: {img.resourceType}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;

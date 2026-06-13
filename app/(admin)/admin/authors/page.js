"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ADMIN_CATEGORY_SHOW } from "@/lib/AdminPanelRoute";

const CategoryShowPage = () => {
  const breadcrumbItems = [
    { label: "Admin-Dashboard", href: "/admin/dashboard" },
    { label: "All-Authors", href: ADMIN_CATEGORY_SHOW },
  ];

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchauthors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/authors`
        );
        setAuthors(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load authors");
      } finally {
        setLoading(false);
      }
    };

    fetchauthors();
  }, []);



  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">All authors</h2>

        {loading ? (
          <p className="text-gray-400">Loading authors...</p>
        ) : authors.data.length === 0 ? (
          <p className="text-gray-400">No authors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 text-white border border-gray-700 rounded">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {authors.data.map((cat) => (
                  <tr
                    key={cat._id}
                    className="border-t border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryShowPage;

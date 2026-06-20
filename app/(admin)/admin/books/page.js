"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ADMIN_CATEGORY_SHOW } from "@/lib/AdminPanelRoute";
import { API_URL } from "@/lib/api";

const BooksShowPage = () => {
  const breadcrumbItems = [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "All Books", href: ADMIN_CATEGORY_SHOW },
  ];

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/books`
        );

        setBooks(res?.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);



  return (
    <div className="p-4 md:p-6">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            All Books
          </h2>

          <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 w-fit">
            Total: {books?.length}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : books?.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-500">No books found.</p>
          </div>
        ) : (
          <>
            {/* ======================
                Desktop Table View
            ====================== */}
            <div className="mt-6 hidden overflow-x-auto rounded-xl border bg-white shadow md:block">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      DiscountPrice
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Publisher
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Author
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Created At
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {books?.map((book, index) => (
                    <tr
                      key={book._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{index + 1}</td>

                      <td className="px-4 py-3 font-medium">
                        {book.title}
                      </td>

                      <td className="px-4 py-3">
                        ৳ {book.price}
                      </td>
                      <td className="px-4 py-3">
                        ৳ {book.discountPrice}
                      </td>

                      <td className="px-4 py-3">
                        {book?.category?.name}
                      </td>

                      <td className="px-4 py-3">
                        {book?.publisher?.name}
                      </td>

                      <td className="px-4 py-3">
                        {book?.author?.name}
                      </td>

                      <td className="px-4 py-3">
                        {new Date(
                          book.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ======================
                Mobile Card View
            ====================== */}
            <div className="mt-6 grid gap-4 md:hidden">
              {books?.map((book, index) => (
                <div
                  key={book._id}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                      #{index + 1}
                    </span>

                    <span className="text-xs text-gray-500">
                      {new Date(
                        book.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {book.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">
                        Price
                      </span>
                      <span>৳ {book.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">
                        Category
                      </span>
                      <span>
                        {book?.category?.name || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">
                        Publisher
                      </span>
                      <span>
                        {book?.publisher?.name || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">
                        Author
                      </span>
                      <span>
                        {book?.author?.name || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BooksShowPage;
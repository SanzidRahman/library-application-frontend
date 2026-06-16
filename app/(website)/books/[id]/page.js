"use client";

import useFetch from "@/hooks/useFetch";
import { addToCart } from "@/redux/reducer/cartReducer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image"; // ✅ Import Next.js Image

const BookDetails = ({ params }) => {
    const { id } = React.use(params);
    const cart = useSelector((state) => state.cartStore);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const { data: response, loading, error } = useFetch(
        `http://localhost:8000/api/books/${id}`
    );

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">Error loading book</p>;

    const book = response?.data;
    if (!book) return <p className="text-gray-500">No book found</p>;

    const handleAddToCart = () => {
        const cartItem = {
            bookId: book._id,
            title: book.title,
            price: book.discountPrice || book.price,
            qty: quantity,
        };
        dispatch(addToCart(cartItem));
        alert("Book added to cart!");
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-green-800 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* ✅ Book Cover Image */}
            <div className="relative h-96 md:h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {book.media?.secureUrl && (
                    <Image
                        src={book.media.secureUrl}
                        alt={book.title}
                        fill
                        className="object-contain p-4"
                        priority
                    />
                )}
            </div>

            {/* ✅ Book Info Section */}
            <div className="p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {book.title}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                        <p><span className="font-semibold">Author:</span> {book.author?.name}</p>
                        <p><span className="font-semibold">Category:</span> {book.category?.name}</p>
                        <p><span className="font-semibold">Publisher:</span> {book.publisher?.name}</p>
                        <p><span className="font-semibold">Publication Year:</span> {book.publicationYear}</p>
                        <p><span className="font-semibold">Price:</span> {book.price} Taka</p>
                        <p><span className="font-semibold">Discount Price:</span> {book.discountPrice} Taka</p>
                        <p><span className="font-semibold">Discount Percentage:</span> {book.discountPercentage}%</p>
                        <p><span className="font-semibold">Stock:</span> {book.stock}</p>
                    </div>
                </div>

                {/* Quantity Selector */}
                <div className="mt-6">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold">Quantity:</span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={decreaseQuantity}
                                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                -
                            </button>
                            <span className="w-10 text-center">{quantity}</span>
                            <button
                                onClick={increaseQuantity}
                                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add To Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>

    );
};

export default BookDetails;

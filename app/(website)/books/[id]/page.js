"use client";

import useFetch from "@/hooks/useFetch";
import { addToCart } from "@/redux/reducer/cartReducer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const BookDetails = ({ params }) => {
    const { id } = React.use(params); // ✅ correct destructuring
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

        // Dispatch to Redux store
        dispatch(addToCart(cartItem));

        alert("Book added to cart!");
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-6">
                    <span className="font-semibold">Quantity:</span>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={decreaseQuantity}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            -
                        </button>
                        <span className="w-10 text-center">{quantity}</span>
                        <button
                            onClick={increaseQuantity}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Add To Cart */}
                <button
                    onClick={handleAddToCart}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

export default BookDetails;

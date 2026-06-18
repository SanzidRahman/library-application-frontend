'use client'

import { addToCart } from "@/redux/reducer/cartReducer";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BookCard({ book }) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    console.log(book)

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


    const discount = book.price - book.discountPrice;

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-green-800 transition">

            <div className="relative">

                <Image
                    src={book?.media?.secureUrl}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="w-full h-72 object-cover"
                    priority
                />

                {book.discountPercentage > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {book.discountPercentage}% OFF
                    </span>
                )}

                {book.stock === 0 && (
                    <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                        Out Of Stock
                    </span>
                )}
            </div>

            <div className="p-4">

                <h3 className="font-bold line-clamp-2">
                    {book.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    {book.author?.name}
                </p>


                <div className="flex items-center gap-2 mt-3">
                    <span className="font-bold text-lg text-green-600">
                        ৳{book.discountPrice}
                    </span>

                    <span className="line-through text-gray-400">
                        ৳{book.price}
                    </span>

                    <span className="text-red-500 text-sm">
                        Save ৳{discount}
                    </span>
                </div>

                <div className="flex gap-2 mt-4">

                    <button
                        onClick={() => handleAddToCart(dispatch(addToCart()))}
                        disabled={book.stock === 0}
                        className="flex-1 bg-black text-white hover:bg-black/60 cursor-pointer transition-all duration-200 py-2 rounded-lg disabled:bg-gray-300"
                    >
                        Add To Cart
                    </button>


                </div>
            </div>
        </div>
    );
}
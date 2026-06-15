"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";

import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from "@/redux/reducer/cartReducer";



const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cartStore);


    return (
        <div>
            {cart.count === 0 ? (
                <div className="min-h-[60vh] flex items-center justify-center px-4">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Your Cart is Empty
                        </h2>

                        <p className="text-muted-foreground mb-6">
                            {`Looks like you haven't added any products yet.`}
                        </p>

                        <Button asChild>
                            <Link href="/shop">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Products */}
                        <div className="flex-1">
                            <div className="overflow-hidden rounded-xl border bg-white">
                                <table className="w-full">
                                    <thead className="hidden md:table-header-group border-b bg-muted/30">
                                        <tr>
                                            <th className="text-left p-4">Books</th>
                                            <th className="text-center p-4">Price</th>
                                            <th className="text-center p-4">Quantity</th>
                                            <th className="text-center p-4">Total</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cart.books.map((book) => (
                                            <tr
                                                key={book._id}
                                                className="block md:table-row border-b"
                                            >
                                                {/* Product */}
                                                <td className="p-4">
                                                    <div className="flex gap-4">


                                                        <div>
                                                            <Link

                                                                className="font-semibold hover:text-primary transition"
                                                            >
                                                                {book.title}
                                                            </Link>

                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Price */}
                                                <td className="md:table-cell flex justify-between md:text-center px-4 pb-2 md:p-4">
                                                    <span className="md:hidden font-medium">Price</span>

                                                    <div>
                                                        <p className="font-medium">
                                                            ৳{(book.price)}
                                                        </p>


                                                    </div>
                                                </td>

                                                {/* Quantity */}
                                                <td className="md:table-cell flex justify-between md:text-center px-4 pb-2 md:p-4">
                                                    <span className="md:hidden font-medium">
                                                        Quantity
                                                    </span>

                                                    <div className="flex items-center border rounded-full overflow-hidden">
                                                        <button
                                                            type="button"
                                                            disabled={book.qty <= 1}
                                                            onClick={() =>
                                                                dispatch(
                                                                    decreaseQuantity({
                                                                        bookId: book.bookId,

                                                                    }),
                                                                )
                                                            }
                                                            className="h-10 w-10 flex items-center justify-center disabled:opacity-50"
                                                        >
                                                            <HiMinus />
                                                        </button>

                                                        <span className="w-12 text-center">
                                                            {book.qty}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                dispatch(
                                                                    increaseQuantity({
                                                                        bookId: book.bookId,
                                                                    }),
                                                                )
                                                            }
                                                            className="h-10 w-10 flex items-center justify-center"
                                                        >
                                                            <HiPlus />
                                                        </button>
                                                    </div>
                                                </td>



                                                {/* Remove */}
                                                <td className="md:table-cell flex justify-between md:text-center px-4 pb-4 md:p-4">
                                                    <span className="md:hidden font-medium">Remove</span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            dispatch(
                                                                removeFromCart({
                                                                    bookId: book.bookId,
                                                                }),
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-600 transition"
                                                    >
                                                        <IoMdCloseCircleOutline size={24} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="w-full lg:w-[350px]">
                            <div className="sticky top-5 rounded-xl border bg-white p-6 shadow-sm">
                                <h3 className="text-xl font-bold mb-5">Order Summary</h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Original Price</span>
                                        {/* <span>৳{(mrp)}</span> */}
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>You Save</span>
                                        {/* <span>৳{(discount)}</span> */}
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        {/* <span>৳{(subTotal)}</span> */}
                                    </div>

                                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        {/* <span>৳{(subTotal)}</span> */}
                                    </div>
                                </div>

                                <Button className="w-full mt-6" asChild>
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>

                                <Link
                                    href="/shop"
                                    className="block text-center text-sm mt-4 hover:underline"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;

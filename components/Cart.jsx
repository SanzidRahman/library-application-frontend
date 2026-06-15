"use client";

import React, { useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import {
  clearCart,
  removeFromCart,
} from "@/redux/reducer/cartReducer";

export default function Cart() {
  const [open, setOpen] = useState(false);

  const cart = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const totalPrice =
    cart?.books?.reduce(
      (total, item) => total + item.price * item.qty,
      0
    ) || 0;

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setOpen(true)}
        className="relative cursor-pointer"
      >
        <BsCart2
          size={25}
          className="text-green-700 hover:text-green-800"
        />

        {cart.count > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
            {cart.count}
          </span>
        )}
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="border-b px-5 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Shopping Cart ({cart.count})
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5">
              {!cart?.books?.length ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4">🛒</div>

                  <h3 className="text-lg font-semibold text-gray-700">
                    Your cart is empty
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Add some books to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.books.map((book) => (
                    <div
                      key={book.bookId}
                      className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {book.title}
                          </h3>

                          <div className="mt-2 text-sm text-gray-500">
                            Quantity: {book.qty}
                          </div>

                          <div className="mt-2 text-green-700 font-bold">
                            ৳{book.price}
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() =>
                              dispatch(removeFromCart(book.bookId))
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={18} />
                          </button>

                          <div className="font-semibold text-gray-800">
                            ৳{book.price * book.qty}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart?.books?.length > 0 && (
              <div className="border-t p-5 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-green-700">
                    ৳{totalPrice}
                  </span>
                </div>

                <button
                  className="w-full border cursor-pointer text-black bg-green-700 py-3 rounded-lg font-medium hover:bg-green-800 transition"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full mt-3 border border-red-500 text-red-500 py-3 rounded-lg font-medium hover:bg-red-50 transition"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
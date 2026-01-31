"use client";

import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { PAGES } from "@/config/page";

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } =
    useCartContext();
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <main className="py-16">
        <div className="text-center container-custom">
          <ShoppingBag
            size={64}
            className="mx-auto mb-4 text-muted-foreground"
          />
          <h1 className="mb-2 text-2xl font-bold font-display">
            Your Cart is Empty
          </h1>
          <p className="mb-6 text-muted-foreground">
            Add some beautiful products to your cart
          </p>
          <Link href="/shop">
            <Button className="btn-primary">Start Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        <h1 className="mb-8 text-3xl font-bold font-display">Shopping Cart</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border bg-card rounded-xl border-border"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-24 rounded-lg h-28"
                  width={100}
                  height={100}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={PAGES.PRODUCT.VIEW(item.productId)}
                        className="font-medium transition-colors hover:text-primary line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Size: {item.size} |{" "}
                        {item.stitchType === "STITCH"
                          ? "Stitched"
                          : "Unstitched"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 transition-colors text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 transition-colors border rounded border-border hover:bg-muted"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 font-medium text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 transition-colors border rounded border-border hover:bg-muted"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">
                        ৳{item.price * item.quantity}
                      </p>
                      {item?.regularPrice && item.regularPrice > item.price && (
                        <p className="text-sm line-through text-muted-foreground">
                          ৳{item.regularPrice * item.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 border top-32 bg-card rounded-xl border-border">
              <h2 className="mb-6 text-xl font-semibold font-display">
                Order Summary
              </h2>

              <div className="pb-4 space-y-3 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">৳{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span className="text-muted-foreground">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-accent">৳{total}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full btn-primary">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link
                href="/shop"
                className="block mt-4 text-center text-primary hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

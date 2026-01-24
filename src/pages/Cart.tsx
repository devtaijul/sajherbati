"use client";

import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import Link from "next/link";

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } =
    useCartContext();
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <main className="py-16">
        <div className="container-custom text-center">
          <ShoppingBag
            size={64}
            className="mx-auto text-muted-foreground mb-4"
          />
          <h1 className="text-2xl font-display font-bold mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-6">
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
        <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-28 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-medium hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Size: {item.size} |{" "}
                        {item.stitchType === "STITCH"
                          ? "Stitched"
                          : "Unstitched"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
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
                        className="p-1 border border-border rounded hover:bg-muted transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 border border-border rounded hover:bg-muted transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">
                        ৳{item.price * item.quantity}
                      </p>
                      {item.regularPrice > item.price && (
                        <p className="text-sm text-muted-foreground line-through">
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
            <div className="sticky top-32 bg-card rounded-xl border border-border p-6">
              <h2 className="font-display font-semibold text-xl mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-border">
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
                <Button size="lg" className="btn-primary w-full">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link
                href="/shop"
                className="block text-center text-primary hover:underline mt-4"
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

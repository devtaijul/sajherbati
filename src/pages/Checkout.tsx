"use client";

import { OrderForm } from "@/components/OrderForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Checkout = () => {
  return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft size={18} />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>

        <OrderForm />
      </div>
    </main>
  );
};

export default Checkout;

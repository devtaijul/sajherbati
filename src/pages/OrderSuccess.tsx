"use client";

import { CheckCircle, Package, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/product";
import { toast } from "sonner";
import { useOrders } from "@/hooks/useOrders";
import { redirect } from "next/navigation";
import Link from "next/link";

const OrderSuccess = () => {
  const order = useOrders().orders.find((o) => o.status === "pending") as
    | Order
    | undefined;

  if (!order) {
    return redirect("/");
  }

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(order.trackingNumber);
    toast.success("Tracking number copied!");
  };

  return (
    <main className="py-12 md:py-16">
      <div className="container-custom max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={48} className="text-success" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground">
            Your order has been placed successfully. We will contact you soon.
          </p>
        </div>

        {/* Tracking Number */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Tracking Number
              </p>
              <p className="text-2xl font-bold text-primary font-mono">
                {order.trackingNumber}
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={copyTrackingNumber}>
              <Copy size={18} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Use this number to track your order
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Package size={20} />
            Order Details
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString("en-US")}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <span className="inline-block px-2 py-1 bg-warning/20 text-warning-foreground rounded text-xs font-medium">
                  Pending
                </span>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium">Cash on Delivery</p>
              </div>
            </div>

            <hr className="border-border" />

            <div className="text-sm">
              <p className="text-muted-foreground mb-2">Delivery Address</p>
              <p className="font-medium">{order.customerName}</p>
              <p>{order.customerPhone}</p>
              <p className="text-muted-foreground">{order.customerAddress}</p>
              <p className="text-muted-foreground">{order.deliveryArea}</p>
            </div>

            <hr className="border-border" />

            {/* Items */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">Order Items</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-sm">
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-border" />

            {/* Total */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span>৳{order.deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span className="text-accent">৳{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/track-order" className="flex-1">
            <Button variant="outline" className="w-full">
              Track Order
            </Button>
          </Link>
          <Link href="/shop" className="flex-1">
            <Button className="btn-primary w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;

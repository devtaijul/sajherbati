"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/types/product";
import { CheckCircle, Copy, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderSuccess = ({ order }: { order: Order }) => {
  const { toast } = useToast();
  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(order.trackingNumber);
    toast({
      title: "Tracking Number Copied",
      description: "Tracking number has been copied to clipboard",
      variant: "default",
    });
  };

  return (
    <main className="py-12 md:py-16">
      <div className="max-w-2xl container-custom">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-success/10">
            <CheckCircle size={48} className="text-success" />
          </div>
          <h1 className="mb-2 text-3xl font-bold font-display text-foreground">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground">
            Your order has been placed successfully. We will contact you soon.
          </p>
        </div>

        {/* Tracking Number */}
        <div className="p-6 mb-6 border bg-primary/5 border-primary/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-muted-foreground">
                Tracking Number
              </p>
              <p className="font-mono text-2xl font-bold text-primary">
                {order.trackingNumber}
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={copyTrackingNumber}>
              <Copy size={18} />
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Use this number to track your order
          </p>
        </div>

        {/* Order Details */}
        <div className="p-6 mb-6 border bg-card border-border rounded-xl">
          <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold font-display">
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
                <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-warning/20 text-warning-foreground">
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
              <p className="mb-2 text-muted-foreground">Delivery Address</p>
              <p className="font-medium">{order.name}</p>
              <p>{order.phone}</p>
              <p className="text-muted-foreground">{order.address}</p>
              <p className="text-muted-foreground">{order.deliveryArea}</p>
            </div>

            <hr className="border-border" />

            {/* Items */}
            <div>
              <p className="mb-3 text-sm text-muted-foreground">Order Items</p>
              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-12 rounded h-14"
                      width={48}
                      height={56}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
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
              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Total</span>
                <span className="text-accent">৳{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/track-order" className="flex-1">
            <Button variant="outline" className="w-full">
              Track Order
            </Button>
          </Link>
          <Link href="/shop" className="flex-1">
            <Button className="w-full btn-primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;

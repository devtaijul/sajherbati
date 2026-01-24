"use client";

import { useState } from "react";
import {
  Search,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import { Order } from "@/types/product";

const statusSteps = [
  { key: "pending", label: "Pending", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: Package },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const TrackOrder = () => {
  const { getOrderByTracking, getOrdersByPhone } = useCartContext();
  const [searchType, setSearchType] = useState<"tracking" | "phone">(
    "tracking",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [foundOrders, setFoundOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    if (searchType === "tracking") {
      const order = getOrderByTracking(searchQuery.trim());
      setFoundOrders(order ? [order] : []);
    } else {
      const orders = getOrdersByPhone(searchQuery.trim());
      setFoundOrders(orders);
    }
  };

  const getStatusIndex = (status: Order["status"]) => {
    if (status === "cancelled") return -1;
    return statusSteps.findIndex((s) => s.key === status);
  };

  return (
    <main className="py-8 md:py-12">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            Track Your Order
          </h1>
          <p className="text-muted-foreground">
            Search by tracking number or mobile number
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSearchType("tracking")}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                searchType === "tracking"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Tracking Number
            </button>
            <button
              onClick={() => setSearchType("phone")}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                searchType === "phone"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Mobile Number
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchType === "tracking"
                  ? "Enter tracking number (e.g., SB...)"
                  : "Enter mobile number"
              }
              className="input-field flex-1"
            />
            <Button type="submit" className="btn-primary px-6">
              <Search size={18} className="mr-2" />
              Search
            </Button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <>
            {foundOrders.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-xl">
                <XCircle
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <h2 className="text-xl font-display font-semibold mb-2">
                  No Orders Found
                </h2>
                <p className="text-muted-foreground">
                  Please check your information and try again
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {foundOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    {/* Order Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tracking Number
                        </p>
                        <p className="text-xl font-bold font-mono text-primary">
                          {order.trackingNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-xl font-bold text-accent">
                          ৳{order.total}
                        </p>
                      </div>
                    </div>

                    {/* Status Progress */}
                    {order.status !== "cancelled" ? (
                      <div className="mb-6">
                        <div className="flex items-center justify-between relative">
                          <div className="absolute top-5 left-0 right-0 h-1 bg-muted" />
                          <div
                            className="absolute top-5 left-0 h-1 bg-primary transition-all"
                            style={{
                              width: `${(getStatusIndex(order.status) / (statusSteps.length - 1)) * 100}%`,
                            }}
                          />
                          {statusSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive =
                              index <= getStatusIndex(order.status);
                            return (
                              <div
                                key={step.key}
                                className="relative z-10 flex flex-col items-center"
                              >
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isActive
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  <Icon size={18} />
                                </div>
                                <span
                                  className={`text-xs mt-2 ${
                                    isActive
                                      ? "text-foreground font-medium"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 p-4 bg-destructive/10 rounded-lg text-center">
                        <XCircle
                          size={24}
                          className="mx-auto text-destructive mb-2"
                        />
                        <p className="font-medium text-destructive">
                          Order Cancelled
                        </p>
                      </div>
                    )}

                    {/* Order Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Order Date</p>
                        <p className="font-medium">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Delivery Area</p>
                        <p className="font-medium">{order.deliveryArea}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Order Items ({order.items.length})
                      </p>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-14 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {item.title}
                              </p>
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
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default TrackOrder;

"use client";

import { useState } from "react";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import { deliveryAreas } from "@/data/products";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Checkout = () => {
  const navigate = useRouter();
  const { cartItems, getCartTotal, createOrder, clearCart } = useCartContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryArea: "",
    note: "",
  });

  const subtotal = getCartTotal();
  const selectedArea = deliveryAreas.find(
    (a) => a.id === formData.deliveryArea,
  );
  const deliveryCharge = selectedArea?.charge || 0;
  const total = subtotal + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <main className="py-16">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-display font-bold mb-2">
            Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-6">
            Please add some products to your cart before checkout
          </p>
          <Link href="/shop">
            <Button className="btn-primary">Start Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 11) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your address");
      return;
    }
    if (!formData.deliveryArea) {
      toast.error("Please select a delivery area");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = createOrder(
        formData.name.trim(),
        formData.phone.trim(),
        formData.address.trim(),
        selectedArea?.name || "",
        formData.note.trim(),
        cartItems,
        deliveryCharge,
      );

      clearCart();
      navigate.push("/order-success", { state: { order } });
    } catch {
      toast.error("Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display font-semibold text-xl mb-6">
                  Delivery Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House no, Road, Area, Thana, District"
                      rows={3}
                      className="input-field resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="deliveryArea"
                      className="block text-sm font-medium mb-2"
                    >
                      Delivery Area *
                    </label>
                    <select
                      id="deliveryArea"
                      name="deliveryArea"
                      value={formData.deliveryArea}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select Area</option>
                      {deliveryAreas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.name} (৳{area.charge})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="note"
                      className="block text-sm font-medium mb-2"
                    >
                      Note (Optional)
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="Any special instructions for your order"
                      rows={2}
                      className="input-field resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display font-semibold text-xl mb-4">
                  Order Items ({cartItems.length})
                </h2>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
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
                    <span className="font-medium">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Delivery Charge
                    </span>
                    <span className="font-medium">
                      {deliveryCharge > 0
                        ? `৳${deliveryCharge}`
                        : "Select area"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">৳{total}</span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-center">💰 Cash on Delivery</p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? "Placing Order..." : "Confirm Order"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;

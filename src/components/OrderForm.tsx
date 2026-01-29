import { createOrder } from "@/actions/mutation.actions";
import { useCartContext } from "@/contexts/CartContext";
import { deliveryAreas } from "@/data/products";
import { useAsyncAction } from "@/hooks/use-async-action";
import { OrderItems, PaymentMethod } from "@/types/product";
import { OrderFormValues, orderSchema } from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export const OrderForm = () => {
  const navigate = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCartContext();
  console.log("cartItems", cartItems);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      deliveryArea: "",
      note: "",
    },
  });

  const { isProcessing, runAction } = useAsyncAction(createOrder, {
    onSuccess: () => {
      toast.success("Order created successfully");
      clearCart();
      reset();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const subtotal = getCartTotal();
  const deliveryArea = useWatch({
    control,
    name: "deliveryArea",
  });

  const selectedArea = deliveryAreas.find((a) => a.id === deliveryArea);

  const deliveryCharge = selectedArea?.charge || 0;
  const total = subtotal + deliveryCharge;

  const normalizePhone = (phone: string) => {
    if (phone.startsWith("+88")) {
      return phone.replace("+88", "");
    }
    return phone;
  };

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

  const onSubmit = async (data: OrderFormValues) => {
    const normalizedPhone = normalizePhone(data.phone);

    const variables = {
      name: data.name,
      phone: normalizedPhone,
      address: data.address,
      deliveryArea: data.deliveryArea,
      note: data.note,
      orderItems: cartItems as OrderItems[],
      paymentMethod: "CASH_ON_DELIVERY" as PaymentMethod,
      subtotal,
      deliveryCharge,
      total,
    };

    await runAction(variables);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                <input {...register("name")} className="input-field" />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Mobile Number *
                </label>
                <input
                  {...register("phone")}
                  placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                  className="input-field"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-2"
                >
                  Full Address *
                </label>
                <textarea
                  {...register("address")}
                  rows={3}
                  className="input-field resize-none"
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="deliveryArea"
                  className="block text-sm font-medium mb-2"
                >
                  Delivery Area *
                </label>
                <select {...register("deliveryArea")} className="input-field">
                  <option value="">Select Area</option>
                  {deliveryAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name} (৳{area.charge})
                    </option>
                  ))}
                </select>
                {errors.deliveryArea && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.deliveryArea.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium mb-2"
                >
                  Note (Optional)
                </label>
                <textarea
                  {...register("note")}
                  rows={3}
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
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-16 object-cover rounded"
                    width={56}
                    height={56}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">৳{item.price * item.quantity}</p>
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
                <span className="text-muted-foreground">Delivery Charge</span>
                <span className="font-medium">
                  {deliveryCharge > 0 ? `৳${deliveryCharge}` : "Select area"}
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
              disabled={isProcessing}
              className="btn-primary w-full"
            >
              {isProcessing ? "Placing Order..." : "Confirm Order"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

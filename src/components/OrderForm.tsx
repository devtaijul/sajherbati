import { createOrder } from "@/actions/mutation.actions";
import { useCartContext } from "@/contexts/CartContext";
import { deliveryAreas } from "@/data/products";
import { useAsyncAction } from "@/hooks/use-async-action";
import { Order, OrderItems, PaymentMethod } from "@/types/product";
import { OrderFormValues, orderSchema } from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { PAGES } from "@/config/page";

export const OrderForm = () => {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCartContext();

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
    onSuccess: (data: { success: boolean; message: string; data: Order }) => {
      toast.success("Order created successfully");
      clearCart();
      reset();
      router.push(PAGES.ORDER_SUCCESS(data.data.id));
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
        <div className="text-center container-custom">
          <h1 className="mb-2 text-2xl font-bold font-display">
            Cart is Empty
          </h1>
          <p className="mb-6 text-muted-foreground">
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
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form Fields */}
        <div className="space-y-6 lg:col-span-2">
          <div className="p-6 border bg-card rounded-xl border-border">
            <h2 className="mb-6 text-xl font-semibold font-display">
              Delivery Information
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Your Name *
                </label>
                <input {...register("name")} className="input-field" />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium"
                >
                  Mobile Number *
                </label>
                <input
                  {...register("phone")}
                  placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                  className="input-field"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium"
                >
                  Full Address *
                </label>
                <textarea
                  {...register("address")}
                  rows={3}
                  className="resize-none input-field"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="deliveryArea"
                  className="block mb-2 text-sm font-medium"
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
                  <p className="mt-1 text-sm text-red-500">
                    {errors.deliveryArea.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="block mb-2 text-sm font-medium"
                >
                  Note (Optional)
                </label>
                <textarea
                  {...register("note")}
                  rows={3}
                  className="resize-none input-field"
                />
              </div>
            </div>
          </div>

          {/* Order Items Preview */}
          <div className="p-6 border bg-card rounded-xl border-border">
            <h2 className="mb-4 text-xl font-semibold font-display">
              Order Items ({cartItems.length})
            </h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="object-cover h-16 rounded w-14"
                    width={56}
                    height={56}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">
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
          <div className="sticky p-6 border top-32 bg-card rounded-xl border-border">
            <h2 className="mb-6 text-xl font-semibold font-display">
              Order Summary
            </h2>

            <div className="pb-4 space-y-3 border-b border-border">
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

            <div className="p-3 mb-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-center">💰 Cash on Delivery</p>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isProcessing}
              className="w-full btn-primary"
            >
              {isProcessing ? "Placing Order..." : "Confirm Order"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

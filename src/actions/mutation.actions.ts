import { ENV_SERVER } from "@/lib/env";
import { OrderCreate } from "@/types/product";

export const createOrder = async (order: OrderCreate) => {
  const res = await fetch(`${ENV_SERVER.API_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const trackOrder = async (trackingNumber: string) => {
  const res = await fetch(
    `${ENV_SERVER.API_URL}/order/track/${trackingNumber}`,
  );
  return res.json();
};

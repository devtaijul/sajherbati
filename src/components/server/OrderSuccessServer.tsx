import { getOrderById } from "@/actions/query.actions";
import OrderSuccess from "@/components/pages/OrderSuccess";
import React from "react";

export const OrderSuccessServer = async ({ orderId }: { orderId: string }) => {
  const order = await getOrderById(orderId);

  if (!order || !order.success) {
    return <div className="text-center py-9">Order not found</div>;
  }

  return <OrderSuccess order={order?.data} />;
};

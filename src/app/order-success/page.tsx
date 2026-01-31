import { OrderSuccessServer } from "@/components/server/OrderSuccessServer";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{
    orderId?: string;
  }>;
}) {
  const queryParams = await searchParams;
  const orderId = queryParams?.orderId || "";

  if (!orderId) {
    return <div className="text-center py-9">Order not found</div>;
  }

  return <OrderSuccessServer orderId={orderId} />;
}

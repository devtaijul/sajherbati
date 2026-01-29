"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const ShopToolbarOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (!value) params.delete(key);
    else params.set(key, value);

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="relative ml-auto">
      <select
        onChange={(e) => updateParam("order", e.target.value)}
        className="px-4 py-2 pr-10 border rounded-lg"
      >
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
    </div>
  );
};

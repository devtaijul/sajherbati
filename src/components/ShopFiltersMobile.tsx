"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShopFiltersMobile({
  open,
  onClose,
  categories,
}: {
  open: boolean;
  categories: Category[] | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (slug === "all") params.delete("category");
    else params.set("category", slug);

    router.push(`/shop?${params.toString()}`, { scroll: false });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute bottom-0 w-full p-6 bg-white rounded-t-2xl">
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => applyCategory("all")}
          >
            All
          </Button>

          {categories && categories?.length > 0 ? (
            categories.map((cat) => (
              <Button
                key={cat.slug}
                variant="outline"
                className="w-full"
                onClick={() => applyCategory(cat.slug)}
              >
                {cat.title}
              </Button>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>

        <Button onClick={onClose} className="w-full mt-6">
          Close
        </Button>
      </div>
    </div>
  );
}

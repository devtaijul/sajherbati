"use client";

import { Category } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";

import React from "react";

export const CategorySidebarClient = ({
  selectedCategory = "all",
  categories,
}: {
  selectedCategory?: string;
  categories: Category[] | null;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (slug === "all") params.delete("category");
    else params.set("category", slug);

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="space-y-2">
      <button
        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
          selectedCategory === "all"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        }`}
        onClick={() => applyCategory("all")}
      >
        All Categories
      </button>

      {categories &&
        categories.map((cat: Category) => (
          <button
            key={cat.id}
            onClick={() => applyCategory(cat.slug)}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === cat.slug
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {cat.title}
          </button>
        ))}
    </div>
  );
};

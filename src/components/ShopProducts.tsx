"use client";

import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, products } from "@/data/products";
import { ChevronDown, Filter, Grid3X3, LayoutGrid } from "lucide-react";
import ProductCard from "./product/ProductCard";
import { DisplayPagination } from "./DisplayPagination";

const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-1500", label: "Under ৳1500", min: 0, max: 1500 },
  { id: "1500-2000", label: "৳1500 - ৳2000", min: 1500, max: 2000 },
  { id: "2000-2500", label: "৳2000 - ৳2500", min: 2000, max: 2500 },
  { id: "above-2500", label: "Above ৳2500", min: 2500, max: Infinity },
];

const sortOptions = [
  { id: "default", label: "Default" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

export const ShopProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const selectedCategory = searchParams.get("category") || "all";
  const selectedPriceRange = searchParams.get("price") || "all";
  const selectedSort = searchParams.get("sort") || "default";
  const selectedFilter = searchParams.get("filter") || "";
  const selectedStitchType = searchParams.get("stitch") || "all";
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== "all") {
      const category = categories.find((c) => c.slug === selectedCategory);
      if (category) {
        result = result.filter((p) => p.categoryId === category.id);
      }
    }

    // Special filters
    if (selectedFilter === "new") {
      result = result.filter((p) => p.newArrival);
    } else if (selectedFilter === "top-selling") {
      result = result.filter((p) => p.isTopSelling);
    }

    // Stitch type
    if (selectedStitchType !== "all") {
      result = result.filter(
        (p) => p.stitchType.toLowerCase() === selectedStitchType.toLowerCase(),
      );
    }

    // Price range
    const priceRange = priceRanges.find((r) => r.id === selectedPriceRange);
    if (priceRange && priceRange.id !== "all") {
      result = result.filter(
        (p) => p.price >= priceRange.min && p.price <= priceRange.max,
      );
    }

    // Sort
    switch (selectedSort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return result;
  }, [
    selectedCategory,
    selectedPriceRange,
    selectedSort,
    selectedFilter,
    selectedStitchType,
  ]);
  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-border">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </Button>

        <div className="flex items-center gap-4 ml-auto">
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="px-4 py-2 pr-10 border rounded-lg appearance-none bg-card border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="absolute -translate-y-1/2 right-3 top-1/2 text-muted-foreground"
            />
          </div>

          <div className="items-center hidden gap-1 p-1 border rounded-lg md:flex border-border">
            <button
              onClick={() => setGridCols(3)}
              className={`p-2 rounded ${
                gridCols === 3 ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 rounded ${
                gridCols === 4 ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <>
          <div
            className={`grid grid-cols-2 gap-4 md:gap-6 ${
              gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <DisplayPagination currentPage={2} totalCount={50} limit={10} />
          </div>
        </>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No products found</p>
          <Button
            variant="outline"
            onClick={() => router.push("/shop")}
            className="mt-4"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

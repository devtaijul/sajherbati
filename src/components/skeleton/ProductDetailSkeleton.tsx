import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image gallery */}
          <div className="space-y-4">
            <Skeleton className="aspect-[3/4] rounded-xl" />

            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-20 h-24 rounded-lg flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Title */}
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />

            {/* Price */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>

            {/* Stock */}
            <Skeleton className="h-4 w-24" />

            {/* Size selector */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-12 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-20" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>

            {/* Attached product */}
            <div className="p-4 rounded-xl border space-y-3">
              <Skeleton className="h-5 w-48" />
              <div className="flex gap-4 items-center">
                <Skeleton className="w-20 h-24 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Product details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-xl">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>

            {/* Care instructions */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>

        {/* Related products */}
        <section className="mt-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailSkeleton;

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryListSkeleton = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container-custom">
        {/* Title skeleton */}
        <div className="text-center mb-10 space-y-3">
          <Skeleton className="h-8 w-56 mx-auto" />
          <Skeleton className="h-4 w-72 mx-auto" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl aspect-[3/4]"
            >
              {/* Image placeholder */}
              <Skeleton className="absolute inset-0" />

              {/* Gradient overlay mimic */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* Text skeleton */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySidebarSkeleton = () => {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky space-y-6 top-32">
        {/* Categories */}
        <div>
          {/* Title */}
          <Skeleton className="w-32 h-6 mb-4" />

          {/* Category list */}
          <div className="space-y-2">
            {/* All categories */}
            <Skeleton className="w-full h-10 rounded-lg" />

            {/* Dynamic categories */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-10 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebarSkeleton;

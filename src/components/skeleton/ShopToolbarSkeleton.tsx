import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ShopToolbarSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b">
      {/* Mobile filter button */}
      <Skeleton className="h-10 rounded-lg w-28 lg:hidden" />

      {/* Sort dropdown */}
      <div className="relative ml-auto">
        <Skeleton className="w-40 h-10 rounded-lg" />
      </div>
    </div>
  );
};

export default ShopToolbarSkeleton;

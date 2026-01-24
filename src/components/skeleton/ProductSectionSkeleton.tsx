import { Skeleton } from "@/components/ui/skeleton";

const ProductSectionSkeleton = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* View all (desktop) */}
          <Skeleton className="hidden md:block h-5 w-20" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-3">
              {/* Image */}
              <Skeleton className="aspect-3/4 rounded-xl" />

              {/* Title */}
              <Skeleton className="h-4 w-3/4" />

              {/* Price */}
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>

        {/* View all (mobile) */}
        <div className="mt-8 text-center md:hidden">
          <Skeleton className="h-5 w-24 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default ProductSectionSkeleton;

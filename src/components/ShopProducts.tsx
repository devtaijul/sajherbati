import ProductCard from "@/components/product/ProductCard";
import { DisplayPagination } from "./DisplayPagination";

import { Product } from "@/types/product";
import { Suspense } from "react";
import ShopToolbarSkeleton from "./skeleton/ShopToolbarSkeleton";
import { ShopToolbar } from "./ShopToolbar";

interface ShopProductsProps {
  products: Product[];
  meta: {
    total: number;
    totalPages: number;
  };
  page: number;
  limit: number;
}

export default function ShopProducts({
  products,
  meta,
  page,
  limit,
}: ShopProductsProps) {
  return (
    <div className="flex-1">
      {/* Client toolbar (filter, sort, mobile btn) */}
      <Suspense fallback={<ShopToolbarSkeleton />}>
        <ShopToolbar />
      </Suspense>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10">
            <DisplayPagination
              currentPage={page}
              totalCount={meta.total}
              limit={limit}
            />
          </div>
        </>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          No products found
        </div>
      )}
    </div>
  );
}

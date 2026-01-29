import { ShopSidebar } from "@/components/ShopSidebar";
import { ShopProducts } from "@/components/ShopProducts";
import { Suspense } from "react";
import CategorySidebarSkeleton from "@/components/skeleton/CategorySidebarSkeleton";

export default function ShopPage({
  category,
}: {
  category: string | undefined;
}) {
  return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl font-display text-foreground">
            Shop
          </h1>
          <p className="mt-2 text-muted-foreground">
            {/* {filteredProducts.length}  */}products found
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <Suspense fallback={<CategorySidebarSkeleton />}>
            <ShopSidebar category_slug={category} />
          </Suspense>

          {/* Main */}
          <ShopProducts />
        </div>
      </div>
    </main>
  );
}

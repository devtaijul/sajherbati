import { ShopSidebar } from "@/components/ShopSidebar";
import { Suspense } from "react";
import CategorySidebarSkeleton from "@/components/skeleton/CategorySidebarSkeleton";
import ShopProducts from "@/components/ShopProducts";
import { getAllProducts } from "@/actions/query.actions";

interface ShopPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    orderBy?: string;
    order?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const {
    page = "1",
    limit = "10",
    search = "",
    category,
    order = "desc",
  } = searchParams;

  const query = new URLSearchParams({
    page,
    limit,
    search,
    order,
  });

  if (category) {
    query.set("category", category);
  }

  const products = await getAllProducts(query);

  return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl font-display">Shop</h1>
          <p className="mt-2 text-muted-foreground">
            {products.total} products found
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <Suspense fallback={<CategorySidebarSkeleton />}>
            <ShopSidebar category_slug={category} />
          </Suspense>

          {/* Products */}
          <ShopProducts
            products={products.data}
            meta={products}
            page={Number(page)}
            limit={Number(limit)}
          />
        </div>
      </div>
    </main>
  );
}

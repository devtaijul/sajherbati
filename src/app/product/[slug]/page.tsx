import { ProductDetailsServer } from "@/components/server/product-details.server";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailsServer slug={slug} />
      </Suspense>
    </div>
  );
};

export default page;

// app/product/[id]/page.tsx
import { getProductById } from "@/actions/query.actions";
import { notFound } from "next/navigation";
import ProductDetailClient from "../ProductDetailClient";

interface PageProps {
  slug: string;
}

export const ProductDetailsServer = async ({ slug }: PageProps) => {
  const product = await getProductById(slug);
  console.log("product", product);

  if (!product) return notFound();

  /*   const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4); */

  return (
    <>
      <ProductDetailClient product={product.data} />
      {/* <RelatedProducts products={relatedProducts} /> */}
    </>
  );
};

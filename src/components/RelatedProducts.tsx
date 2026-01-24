import ProductCard from "@/components/product/ProductCard";

export default function RelatedProducts({ products }: any) {
  if (!products.length) return null;

  return (
    <section className="container-custom mt-16">
      <h2 className="section-title mb-8">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

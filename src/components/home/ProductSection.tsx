import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";
import Link from "next/link";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

const ProductSection = ({
  title,
  subtitle,
  products,
  viewAllLink,
}: ProductSectionProps) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="hidden md:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
            >
              View All
              <ChevronRight size={18} />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {viewAllLink && (
          <div className="mt-8 text-center md:hidden">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-1 text-primary font-medium"
            >
              View All
              <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;

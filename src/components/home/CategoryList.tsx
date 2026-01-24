import { categories } from "@/data/products";
import Link from "next/link";

const CategoryList = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title">Browse Categories</h2>
          <p className="section-subtitle">Choose your favorite category</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="font-display text-lg md:text-xl font-semibold text-card">
                  {category.name}
                </h3>
                <p className="text-card/80 text-sm mt-1">
                  {category.productCount} Products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;

import { getParentCategories } from "@/actions/query.actions";
import { PLACEHOLDER_IMAGE } from "@/config/image";
import { Category } from "@/types/product";
import Image from "next/image";

import Link from "next/link";
import React from "react";

export const CategoryListServer = async () => {
  const categories = await getParentCategories();

  if (!categories) {
    return null;
  }
  console.log("categories", categories);

  if (categories.data.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="section-title">Browse Categories</h2>
            <p className="section-subtitle">Choose your favorite category</p>
          </div>

          <div>No categories found</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="section-title">Browse Categories</h2>
          <p className="section-subtitle">Choose your favorite category</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.data.length > 0
            ? categories.data.map((category: Category, index: number) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.slug}`}
                  className="relative overflow-hidden group rounded-xl aspect-3/4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={
                      category.featuredImageId
                        ? category.featuredImage.url
                        : PLACEHOLDER_IMAGE.CATEGORY
                    }
                    alt={category.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    width={400}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-lg font-semibold font-display md:text-xl text-card">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-sm text-card/80">
                      {category.productCount} Products
                    </p>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

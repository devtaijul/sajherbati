"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { useCartContext } from "@/contexts/CartContext";
import { products } from "@/data/products";
import Link from "next/link";

const Favorites = () => {
  const { favorites } = useCartContext();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <main className="py-16">
        <div className="container-custom text-center">
          <Heart size={64} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-display font-bold mb-2">
            No Favorite Products
          </h1>
          <p className="text-muted-foreground mb-6">
            Click on the heart icon to save your favorite products
          </p>
          <Link href="/shop">
            <Button className="btn-primary">Start Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-display font-bold mb-8">
          Favorite Products ({favoriteProducts.length})
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {favoriteProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Favorites;

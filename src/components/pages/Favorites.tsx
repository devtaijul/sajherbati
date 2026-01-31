"use client";

import { useCartContext } from "@/contexts/CartContext";

const Favorites = () => {
  const { favorites } = useCartContext();
  return null;

  /* if (favoriteProducts.length === 0) {
    return (
      <main className="py-16">
        <div className="text-center container-custom">
          <Heart size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-bold font-display">
            No Favorite Products
          </h1>
          <p className="mb-6 text-muted-foreground">
            Click on the heart icon to save your favorite products
          </p>
          <Link href="/shop">
            <Button className="btn-primary">Start Shopping</Button>
          </Link>
        </div>
      </main>
    );
  } */

  /* return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        <h1 className="mb-8 text-3xl font-bold font-display">
          Favorite Products ({favoriteProducts.length})
        </h1>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
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
  ); */
};

export default Favorites;

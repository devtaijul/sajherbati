import CategoryList from "@/components/home/CategoryList";
import HeroSlider from "@/components/home/HeroSlider";
import ProductSection from "@/components/home/ProductSection";
import { NewProductServer } from "@/components/server/NewProductServer";
import { TopSellsProductServer } from "@/components/server/TopSellsProductServer";
import ProductSectionSkeleton from "@/components/skeleton/ProductSectionSkeleton";
import { getFeaturedProducts, getTopSellingProducts } from "@/data/products";
import { Suspense } from "react";

export const Home = () => {
  const topSelling = getTopSellingProducts();

  const featured = getFeaturedProducts();

  return (
    <main>
      <HeroSlider />

      <CategoryList />

      <Suspense fallback={<ProductSectionSkeleton />}>
        <NewProductServer />
      </Suspense>

      <div className="bg-muted/30">
        <Suspense fallback={<ProductSectionSkeleton />}>
          <TopSellsProductServer />
        </Suspense>
      </div>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-display font-semibold text-lg">
                Fast Delivery
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Nationwide Delivery
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-display font-semibold text-lg">
                Cash on Delivery
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Pay when you receive
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-display font-semibold text-lg">
                Premium Quality
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                100% Original Products
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-display font-semibold text-lg">
                Easy Returns
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                7 Days Return Policy
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

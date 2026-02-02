import CategoryList from "@/components/home/CategoryList";
import HeroSlider from "@/components/home/HeroSlider";
import { NewProductServer } from "@/components/server/NewProductServer";
import { TopSellsProductServer } from "@/components/server/TopSellsProductServer";
import ProductSectionSkeleton from "@/components/skeleton/ProductSectionSkeleton";
import { Suspense } from "react";

export const Home = async () => {
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
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            <div className="text-center">
              <div className="mb-3 text-4xl">🚚</div>
              <h3 className="text-lg font-semibold font-display">
                Fast Delivery
              </h3>
              <p className="mt-1 text-sm text-primary-foreground/70">
                Nationwide Delivery
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">💰</div>
              <h3 className="text-lg font-semibold font-display">
                Cash on Delivery
              </h3>
              <p className="mt-1 text-sm text-primary-foreground/70">
                Pay when you receive
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">✨</div>
              <h3 className="text-lg font-semibold font-display">
                Premium Quality
              </h3>
              <p className="mt-1 text-sm text-primary-foreground/70">
                100% Original Products
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl">🔄</div>
              <h3 className="text-lg font-semibold font-display">
                Easy Returns
              </h3>
              <p className="mt-1 text-sm text-primary-foreground/70">
                7 Days Return Policy
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

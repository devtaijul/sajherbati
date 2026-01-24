import HeroSlider from "@/components/home/HeroSlider";
import CategoryList from "@/components/home/CategoryList";
import ProductSection from "@/components/home/ProductSection";
import {
  getTopSellingProducts,
  getNewArrivals,
  getFeaturedProducts,
} from "@/data/products";

export const Home = () => {
  const topSelling = getTopSellingProducts();
  const newArrivals = getNewArrivals();
  const featured = getFeaturedProducts();

  return (
    <main>
      <HeroSlider />

      <CategoryList />

      <ProductSection
        title="New Arrivals"
        subtitle="Latest Collection"
        products={newArrivals}
        viewAllLink="/shop?filter=new"
      />

      <div className="bg-muted/30">
        <ProductSection
          title="Best Sellers"
          subtitle="Our Popular Products"
          products={topSelling}
          viewAllLink="/shop?filter=top-selling"
        />
      </div>

      <ProductSection
        title="Featured Products"
        subtitle="Handpicked Collection"
        products={featured}
        viewAllLink="/shop"
      />

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

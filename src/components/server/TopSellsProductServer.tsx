import { getSpecialProducts } from "@/actions/query.actions";
import ProductSection from "../home/ProductSection";

export const TopSellsProductServer = async () => {
  const products = await getSpecialProducts("top");
  if (!products.success) {
    return (
      <div>
        <h1>Something went wrong!</h1>
      </div>
    );
  }
  return (
    <ProductSection
      title="Best Sellers"
      subtitle="Our Popular Products"
      products={products.data}
      viewAllLink="/shop?filter=top-selling"
    />
  );
};

import { getSpecialProducts } from "@/actions/query.actions";
import ProductSection from "../home/ProductSection";

export const NewProductServer = async () => {
  const products = await getSpecialProducts("new");

  if (!products.success) {
    return (
      <div>
        <h1>Something went wrong!</h1>
      </div>
    );
  }

  return (
    <ProductSection
      title="New Arrivals"
      subtitle="Latest Collection"
      products={products.data}
      viewAllLink="/shop?filter=new"
    />
  );
};

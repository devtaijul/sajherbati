import { getFlatCategories } from "@/actions/query.actions";
import { ShopToolbarFilter } from "./ShopToolbarFilter";
import { ShopToolbarOrder } from "./ShopToolbarOrder";

export async function ShopToolbar() {
  const data = await getFlatCategories();

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b">
        <ShopToolbarFilter categories={data?.flatCategories} />

        <ShopToolbarOrder />
      </div>
    </>
  );
}

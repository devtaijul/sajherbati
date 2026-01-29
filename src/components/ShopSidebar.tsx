import { getFlatCategories } from "@/actions/query.actions";
import { CategorySidebarClient } from "./CategorySidebarClient";

export const ShopSidebar = async ({
  category_slug,
}: {
  category_slug: string | undefined;
}) => {
  const selectedCategory = category_slug || "all";

  const result = await getFlatCategories();

  if (!result) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (result.flatCategories.length === 0) {
    return (
      <div>
        <p>No categories found</p>
      </div>
    );
  }

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky space-y-6 top-32">
        {/* Categories */}
        <div>
          <h3 className="mb-4 text-lg font-semibold font-display">
            Categories
          </h3>
          <CategorySidebarClient
            categories={result.flatCategories}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </aside>
  );
};

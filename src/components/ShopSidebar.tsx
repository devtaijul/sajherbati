import { getFlatCategories } from "@/actions/query.actions";
import { Category } from "@/types/product";

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

  console.log("categories", result);

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
          <div className="space-y-2">
            <button
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              All Categories
            </button>

            {result.flatCategories.map((cat: Category) => (
              <button
                key={cat.id}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

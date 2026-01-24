import { Suspense } from "react";
import { CategoryListServer } from "../server/CategoryListServer";
import { CategoryListSkeleton } from "../skeleton/CategoryListSkeleton";

const CategoryList = () => {
  return (
    <Suspense fallback={<CategoryListSkeleton />}>
      <CategoryListServer />
    </Suspense>
  );
};

export default CategoryList;

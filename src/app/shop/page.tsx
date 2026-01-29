import ShopPage from "@/pages/Shop";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    category?: string;
  }>;
}) {
  const queryParams = await searchParams;
  const query = queryParams?.query || "";
  const currentPage = Number(queryParams?.page) || 1;
  const category = queryParams?.category || "";

  console.log("query", query);
  console.log("currentPage", currentPage);
  console.log("category", category);

  return <ShopPage category={category} />;
}

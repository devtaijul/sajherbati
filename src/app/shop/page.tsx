import ShopPage from "@/components/pages/Shop";

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
  const currentPage = queryParams?.page || "1";
  const category = queryParams?.category || "";

  return (
    <ShopPage
      searchParams={{
        category: category,
        limit: "20",
        page: currentPage,
        search: query,
      }}
    />
  );
}

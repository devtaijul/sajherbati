import ProductDetail from "@/pages/ProductDetail";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div>
      <ProductDetail id={slug} />
    </div>
  );
};

export default page;

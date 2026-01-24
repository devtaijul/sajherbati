import { ENV_SERVER } from "@/lib/env";

export const getParentCategories = async () => {
  const res = await fetch(`${ENV_SERVER.API_URL}/category/parent`);
  return res.json();
};
export const getSpecialProducts = async (type: "new" | "top" = "top") => {
  const res = await fetch(`${ENV_SERVER.API_URL}/product/special?type=${type}`);
  return res.json();
};

export const getProductById = async (slug: string) => {
  const res = await fetch(`${ENV_SERVER.API_URL}/product/${slug}`);
  return res.json();
};

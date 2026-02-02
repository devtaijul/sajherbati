import { ENV_SERVER } from "@/lib/env";

export const getParentCategories = async () => {
  const res = await fetch(`${ENV_SERVER.API_URL}/category/parent`, {
    cache: "no-cache",
  });

  return res.json();
};
export const getSpecialProducts = async (type: "new" | "top" = "top") => {
  const res = await fetch(
    `${ENV_SERVER.API_URL}/product/special?type=${type}`,
    {
      cache: "no-cache",
    },
  );
  return res.json();
};

export const getProductById = async (slug: string) => {
  const res = await fetch(`${ENV_SERVER.API_URL}/product/${slug}`, {
    cache: "no-cache",
  });
  return res.json();
};

export const getFlatCategories = async () => {
  const res = await fetch(`${ENV_SERVER.API_URL}/category/flat`, {
    cache: "no-cache",
  });
  return res.json();
};

export const getAllProducts = async (query: URLSearchParams) => {
  const res = await fetch(`${ENV_SERVER.API_URL}/product?${query.toString()}`, {
    cache: "no-cache",
  });
  return res.json();
};

export const getOrderById = async (id: string) => {
  const res = await fetch(`${ENV_SERVER.API_URL}/order/${id}`, {
    cache: "no-cache",
  });
  return res.json();
};

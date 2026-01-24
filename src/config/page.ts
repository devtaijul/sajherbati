export const PAGES = {
  HOME: "/",
  SHOP: "/shop",
  CART: "/cart",
  CHECKOUT: "/checkout",
  FAVORITES: "/favorites",
  TRACK_ORDER: "/track-order",
  ORDER_SUCCESS: "/order-success",
  PRODUCT: {
    ROOT: "/product",
    VIEW: (slug: string) => `/product/${slug}`,
  },
};

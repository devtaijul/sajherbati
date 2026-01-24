"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useOrders } from "@/hooks/useOrders";
import { CartItem, Order } from "@/types/product";

interface CartContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getFavoritesCount: () => number;

  // Orders
  orders: Order[];
  createOrder: (
    customerName: string,
    customerPhone: string,
    customerAddress: string,
    deliveryArea: string,
    note: string,
    items: CartItem[],
    deliveryCharge: number,
  ) => Order;
  getOrderByTracking: (trackingNumber: string) => Order | undefined;
  getOrdersByPhone: (phone: string) => Order[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const cart = useCart();
  const favorites = useFavorites();
  const orders = useOrders();

  const value: CartContextType = {
    // Cart
    cartItems: cart.items,
    addToCart: cart.addToCart,
    updateQuantity: cart.updateQuantity,
    removeFromCart: cart.removeFromCart,
    clearCart: cart.clearCart,
    getCartTotal: cart.getCartTotal,
    getCartCount: cart.getCartCount,

    // Favorites
    favorites: favorites.favorites,
    toggleFavorite: favorites.toggleFavorite,
    isFavorite: favorites.isFavorite,
    getFavoritesCount: favorites.getFavoritesCount,

    // Orders
    orders: orders.orders,
    createOrder: orders.createOrder,
    getOrderByTracking: orders.getOrderByTracking,
    getOrdersByPhone: orders.getOrdersByPhone,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

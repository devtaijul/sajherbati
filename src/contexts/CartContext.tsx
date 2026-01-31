"use client";

import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { CartItem } from "@/types/product";
import React, { createContext, ReactNode, useContext } from "react";

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const cart = useCart();
  const favorites = useFavorites();

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

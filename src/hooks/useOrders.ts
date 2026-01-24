"use client";

import { useState, useEffect, useCallback } from "react";
import { Order, CartItem } from "@/types/product";

const ORDERS_STORAGE_KEY = "shajer-bati-orders";

const generateTrackingNumber = (): string => {
  const prefix = "SB";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders from localStorage");
      }
    }
    setIsLoaded(true);
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  const createOrder = useCallback(
    (
      customerName: string,
      customerPhone: string,
      customerAddress: string,
      deliveryArea: string,
      note: string,
      items: CartItem[],
      deliveryCharge: number,
    ): Order => {
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        trackingNumber: generateTrackingNumber(),
        customerName,
        customerPhone,
        customerAddress,
        deliveryArea,
        note,
        items,
        subtotal,
        deliveryCharge,
        total: subtotal + deliveryCharge,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    },
    [],
  );

  const getOrderByTracking = useCallback(
    (trackingNumber: string): Order | undefined => {
      return orders.find(
        (o) => o.trackingNumber.toLowerCase() === trackingNumber.toLowerCase(),
      );
    },
    [orders],
  );

  const getOrdersByPhone = useCallback(
    (phone: string): Order[] => {
      return orders.filter((o) => o.customerPhone.includes(phone));
    },
    [orders],
  );

  return {
    orders,
    createOrder,
    getOrderByTracking,
    getOrdersByPhone,
    isLoaded,
  };
};

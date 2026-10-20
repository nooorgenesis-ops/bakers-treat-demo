"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuItem, MenuItemVariant } from "@/data/menu";

export interface CartItem {
  product: MenuItem;
  selectedVariant?: MenuItemVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: MenuItem, variant?: MenuItemVariant) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addedFeedbackId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "sr_bakers_treat_cart";

export function getCartItemKey(item: { product: MenuItem; selectedVariant?: MenuItemVariant }): string {
  return item.selectedVariant
    ? `${item.product.id}-${item.selectedVariant.name}`
    : item.product.id;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedFeedbackId, setAddedFeedbackId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from sessionStorage on client mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Storage access may be restricted
    }
    setIsHydrated(true);
  }, []);

  // Save to sessionStorage whenever items change (after initial hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota or restriction
    }
  }, [items, isHydrated]);

  const addToCart = (product: MenuItem, variant?: MenuItemVariant) => {
    if (!product.available) return;

    const chosenVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const targetKey = chosenVariant ? `${product.id}-${chosenVariant.name}` : product.id;

    setItems((prev) => {
      const existing = prev.find((item) => getCartItemKey(item) === targetKey);
      if (existing) {
        return prev.map((item) =>
          getCartItemKey(item) === targetKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedVariant: chosenVariant, quantity: 1 }];
    });

    // Provide unobtrusive feedback
    setAddedFeedbackId(product.id);
    setTimeout(() => {
      setAddedFeedbackId((curr) => (curr === product.id ? null : curr));
    }, 1500);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (getCartItemKey(item) === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => getCartItemKey(item) !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.selectedVariant?.price ?? item.product.price ?? 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addedFeedbackId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

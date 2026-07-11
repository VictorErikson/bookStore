import { createContext, useContext, useState } from "react";
import type { Book } from "../types/book";

export interface CartItem {
  documentId: string;
  title: string;
  price: number;
  coverUrl?: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  increment: (documentId: string) => void;
  decrement: (documentId: string) => void;
  removeFromCart: (documentId: string) => void;
  clearCart: () => void;
  totalCount: number;
  cartIsOpen: boolean;
  setCartIsOpen: (open: boolean) => void;
}

const CART_KEY = "cart";

const readCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(readCart);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const persist = (next: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    return next;
  };

  const addToCart = (book: Book) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.documentId === book.documentId);
      const next = existing
        ? prev.map((i) =>
            i.documentId === book.documentId ? { ...i, qty: i.qty + 1 } : i
          )
        : [
            ...prev,
            {
              documentId: book.documentId,
              title: book.title,
              price: book.price,
              coverUrl: book.cover?.url,
              qty: 1,
            },
          ];
      return persist(next);
    });
  };

  const increment = (documentId: string) => {
    setItems((prev) =>
      persist(
        prev.map((i) =>
          i.documentId === documentId ? { ...i, qty: i.qty + 1 } : i
        )
      )
    );
  };

  const decrement = (documentId: string) => {
    setItems((prev) =>
      persist(
        prev
          .map((i) =>
            i.documentId === documentId ? { ...i, qty: i.qty - 1 } : i
          )
          .filter((i) => i.qty > 0)
      )
    );
  };

  const removeFromCart = (documentId: string) => {
    setItems((prev) =>
      persist(prev.filter((i) => i.documentId !== documentId))
    );
  };

  const clearCart = () => {
    setItems(persist([]));
  };

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        totalCount,
        cartIsOpen,
        setCartIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

import { createContext, useContext, useState } from "react";
import type { Book } from "../types/book";

interface BookInfoContextType {
  bookInfoId: string | null;
  setBookInfoId: (id: string | null) => void;
  mousePos: { x: number; y: number };
  setMousePos: (pos: { x: number; y: number }) => void;
}

const BookInfoContext = createContext<BookInfoContextType | undefined>(
  undefined
);

export const BookInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookInfoId, setBookInfoId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <BookInfoContext.Provider
      value={{ bookInfoId, setBookInfoId, mousePos, setMousePos }}
    >
      {children}
    </BookInfoContext.Provider>
  );
};

export const useBookInfo = () => {
  const context = useContext(BookInfoContext);
  if (!context)
    throw new Error("useBookInfo must be used within BookInfoProvider");
  return context;
};

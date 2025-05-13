import { createContext, useContext, useState } from "react";
import type { Book } from "../types/book";

interface BookInfoContextType {
  bookInfoBox: Book | null;
  setBookInfoBox: (book: Book | null) => void;
  mousePos: { x: number; y: number };
  setMousePos: (pos: { x: number; y: number }) => void;
}

const BookInfoContext = createContext<BookInfoContextType | undefined>(
  undefined
);

export const BookInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookInfoBox, setBookInfoBox] = useState<Book | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <BookInfoContext.Provider
      value={{ bookInfoBox, setBookInfoBox, mousePos, setMousePos }}
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

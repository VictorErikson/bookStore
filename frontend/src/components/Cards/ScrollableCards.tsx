import React, { useRef, useEffect, useMemo } from "react";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import Card from "./Card";
import type { SortOption, SortOptionWithRatings } from "../../types/sorting";
import { useAnonData } from "../../contexts/anonDataContext";

interface Props {
  books: Book[];
  user?: User;
  setWarningMsg: (msg: string) => void;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  starredBooks: Book[];
  ratedBooks: Book[];
  sortBy: SortOption | SortOptionWithRatings;
}

const ScrollableCards: React.FC<Props> = ({
  books,
  user,
  setWarningMsg,
  isLoggedin,
  setIsLoggedin,
  setBooks,
  setUser,
  starredBooks,
  ratedBooks,
  sortBy,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const initialScrollLeft = useRef(0);
  const { anonRatings } = useAnonData();

  // sorting books

  const buildRatingMap = () => {
    if (user?.ratings) {
      return new Map<string, number>(
        user.ratings
          .filter((r) => r.book)
          .map((r) => [r.book!.documentId, r.rating] as [string, number])
      );
    }
    return new Map<string, number>(
      Object.entries(anonRatings).map(([id, anon]) => [id, anon.value])
    );
  };

  const sortedBooks = useMemo(() => {
    const copy = [...books];
    switch (sortBy) {
      case "Price: Low to High":
        return copy.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return copy.sort((a, b) => b.price - a.price);
      case "Author: A-z":
        return copy.sort((a, b) =>
          a.author.localeCompare(b.author, undefined, { sensitivity: "base" })
        );
      case "Author: Z-a":
        return copy.sort((a, b) =>
          b.author.localeCompare(a.author, undefined, { sensitivity: "base" })
        );
      case "Title: A-z":
        return copy.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
        );
      case "Title: Z-a":
        return copy.sort((a, b) =>
          b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
        );
      case "My Rating: High to Low": {
        const ratingMap = buildRatingMap();

        copy.sort((a, b) => {
          const ratingA = ratingMap.get(a.documentId) ?? 0;
          const ratingB = ratingMap.get(b.documentId) ?? 0;
          return ratingB - ratingA;
        });

        return copy;
      }
      case "My Rating: Low to High": {
        const ratingMap = buildRatingMap();

        copy.sort((a, b) => {
          const ratingA = ratingMap.get(a.documentId) ?? 0;
          const ratingB = ratingMap.get(b.documentId) ?? 0;
          return ratingA - ratingB;
        });
        return copy;
      }

      default:
        return copy;
    }
  }, [books, sortBy, user?.ratings, anonRatings]);

  // draggable card-container
  // make sure we cancel drag if the mouse goes up anywhere on the page
  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
      containerRef.current?.classList.remove("cursor-grabbing");
      // re-enable user-select
      if (containerRef.current) containerRef.current.style.userSelect = "auto";
    };
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    containerRef.current?.classList.add("cursor-grabbing");
    // disable text-selection
    if (containerRef.current) containerRef.current.style.userSelect = "none";
    startX.current = e.clientX - (containerRef.current?.offsetLeft || 0);
    initialScrollLeft.current = containerRef.current?.scrollLeft || 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.clientX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5; // adjust scroll speed
    if (containerRef.current) {
      containerRef.current.scrollLeft = initialScrollLeft.current - walk;
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex gap-[20px] px-[16px] lg:px-[25px] py-[30px] lg:py-[45px] overflow-x-auto no-scrollbar cursor-grab"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      {sortedBooks.map((book) => (
        <Card
          key={book.documentId}
          book={book}
          user={user}
          setWarningMsg={setWarningMsg}
          isLoggedin={isLoggedin}
          setIsLoggedin={setIsLoggedin}
          setBooks={setBooks}
          setUser={setUser}
          starredBooks={starredBooks}
          ratedBooks={ratedBooks}
        />
      ))}
    </div>
  );
};

export default ScrollableCards;

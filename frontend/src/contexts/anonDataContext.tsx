import { createContext, useContext, useState } from "react";

export interface AnonRating {
  value: number;
  ratingDocumentId?: string;
}

interface AnonDataContextType {
  anonLikes: string[];
  anonRatings: Record<string, AnonRating>;
  toggleAnonLike: (bookId: string) => void;
  setAnonRating: (
    bookId: string,
    value: number,
    ratingDocumentId?: string
  ) => void;
  removeAnonRating: (bookId: string) => void;
  clearAnonData: () => void;
}

const LIKES_KEY = "anonLikes";
const RATINGS_KEY = "anonRatings";

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const AnonDataContext = createContext<AnonDataContextType | undefined>(
  undefined
);

export const AnonDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [anonLikes, setAnonLikes] = useState<string[]>(() =>
    readJson<string[]>(LIKES_KEY, [])
  );
  const [anonRatings, setAnonRatings] = useState<Record<string, AnonRating>>(
    () => readJson<Record<string, AnonRating>>(RATINGS_KEY, {})
  );

  const toggleAnonLike = (bookId: string) => {
    setAnonLikes((prev) => {
      const next = prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId];
      localStorage.setItem(LIKES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const setAnonRating = (
    bookId: string,
    value: number,
    ratingDocumentId?: string
  ) => {
    setAnonRatings((prev) => {
      const next = {
        ...prev,
        [bookId]: {
          value,
          ratingDocumentId:
            ratingDocumentId ?? prev[bookId]?.ratingDocumentId,
        },
      };
      localStorage.setItem(RATINGS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const removeAnonRating = (bookId: string) => {
    setAnonRatings((prev) => {
      const next = { ...prev };
      delete next[bookId];
      localStorage.setItem(RATINGS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearAnonData = () => {
    localStorage.removeItem(LIKES_KEY);
    localStorage.removeItem(RATINGS_KEY);
    setAnonLikes([]);
    setAnonRatings({});
  };

  return (
    <AnonDataContext.Provider
      value={{
        anonLikes,
        anonRatings,
        toggleAnonLike,
        setAnonRating,
        removeAnonRating,
        clearAnonData,
      }}
    >
      {children}
    </AnonDataContext.Provider>
  );
};

export const useAnonData = () => {
  const context = useContext(AnonDataContext);
  if (!context)
    throw new Error("useAnonData must be used within AnonDataProvider");
  return context;
};

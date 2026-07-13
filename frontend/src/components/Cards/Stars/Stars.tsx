import React, { useState, useMemo, useRef } from "react";
import type { Book, Rating, RatingValue } from "../../../types/book";
import type { User, UserRating } from "../../../types/user";
import IconStarFilled from "../../logos/IconStarFilled";
import IconStar from "../../logos/IconStar";
import rateBook from "../../../services/rateBook";
import { useAnonData } from "../../../contexts/anonDataContext";
import { useToast } from "../../../contexts/toastContext";

interface StarRatingProps {
  book: Book;
  user?: User | null;
  userRatings?: UserRating[];
  setWarningMsg: (msg: string) => void;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const StarRating: React.FC<StarRatingProps> = ({
  book,
  user,
  isLoggedin,
  setBooks,
  setUser,
}) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const pendingRef = useRef(false);
  const { anonRatings, setAnonRating, removeAnonRating } = useAnonData();
  const { showToast } = useToast();

  const bookRatings = book.ratings;

  const { userRating, userRatingId, userHasRated } = useMemo(() => {
    if (isLoggedin && user?.ratings) {
      const match = user.ratings.find(
        (rating) => rating.book?.documentId === book.documentId
      );
      return {
        userRating: match?.rating ?? null,
        userRatingId: match ?? null,
        userHasRated: !!match,
      };
    }

    const anon = anonRatings[book.documentId];
    if (anon) {
      return {
        userRating: anon.value,
        userRatingId: null,
        userHasRated: true,
      };
    }

    return { userRating: null, userRatingId: null, userHasRated: false };
  }, [isLoggedin, user?.ratings, anonRatings, book.documentId]);

  let totalRatings = 0;

  let averageRatingEven: number;

  if (bookRatings) {
    bookRatings.forEach((rating) => {
      totalRatings += rating.rating;
    });
    const averageRatingUneven = totalRatings / bookRatings.length;
    averageRatingEven = Math.round(averageRatingUneven);
  }

  const patchBookRating = (
    ratingDocId: string,
    value: number,
    mode: "add" | "update"
  ) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.documentId !== book.documentId) return b;
        const ratings = b.ratings ?? [];
        if (mode === "add") {
          const newRating: Rating = {
            id: -1,
            documentId: ratingDocId,
            rating: value as RatingValue,
            createdAt: "",
            updatedAt: "",
            publishedAt: null,
          };
          return { ...b, ratings: [...ratings, newRating] };
        }
        return {
          ...b,
          ratings: ratings.map((r) =>
            r.documentId === ratingDocId
              ? { ...r, rating: value as RatingValue }
              : r
          ),
        };
      })
    );
  };

  const removeBookRating = (ratingDocId: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.documentId === book.documentId
          ? {
              ...b,
              ratings: (b.ratings ?? []).filter(
                (r) => r.documentId !== ratingDocId
              ),
            }
          : b
      )
    );
  };

  const renameBookRating = (fromDocId: string, toDocId: string, id: number) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.documentId === book.documentId
          ? {
              ...b,
              ratings: (b.ratings ?? []).map((r) =>
                r.documentId === fromDocId ? { ...r, id, documentId: toDocId } : r
              ),
            }
          : b
      )
    );
  };

  const rateAsUser = async (value: number) => {
    if (!user) return;
    const existing = userRatingId;

    if (existing) {
      const prevValue = existing.rating;
      setUser((prev) =>
        prev
          ? {
              ...prev,
              ratings: prev.ratings.map((r) =>
                r.documentId === existing.documentId
                  ? { ...r, rating: value }
                  : r
              ),
            }
          : prev
      );
      patchBookRating(existing.documentId, value, "update");
      try {
        await rateBook(value - 1, existing, true, user, book);
      } catch {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                ratings: prev.ratings.map((r) =>
                  r.documentId === existing.documentId
                    ? { ...r, rating: prevValue }
                    : r
                ),
              }
            : prev
        );
        patchBookRating(existing.documentId, prevValue, "update");
        showToast("Couldn't save your rating, please try again.");
      }
      return;
    }

    const tempDocId = `temp-${book.documentId}`;
    const tempRating: UserRating = {
      id: -1,
      documentId: tempDocId,
      rating: value,
      createdAt: "",
      updatedAt: "",
      publishedAt: null,
      book,
    };
    setUser((prev) =>
      prev ? { ...prev, ratings: [...prev.ratings, tempRating] } : prev
    );
    patchBookRating(tempDocId, value, "add");
    try {
      const response = await rateBook(value - 1, null, false, user, book);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              ratings: prev.ratings.map((r) =>
                r.documentId === tempDocId
                  ? {
                      ...r,
                      id: response.data.id,
                      documentId: response.data.documentId,
                    }
                  : r
              ),
            }
          : prev
      );
      renameBookRating(tempDocId, response.data.documentId, response.data.id);
    } catch {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              ratings: prev.ratings.filter((r) => r.documentId !== tempDocId),
            }
          : prev
      );
      removeBookRating(tempDocId);
      showToast("Couldn't save your rating, please try again.");
    }
  };

  const rateAsAnon = async (value: number) => {
    const prevAnon = anonRatings[book.documentId];
    const existingDocId = prevAnon?.ratingDocumentId;
    const tempDocId = `temp-${book.documentId}`;

    setAnonRating(book.documentId, value);
    if (existingDocId) {
      patchBookRating(existingDocId, value, "update");
    } else {
      patchBookRating(tempDocId, value, "add");
    }
    try {
      const response = await rateBook(
        value - 1,
        null,
        false,
        undefined,
        book,
        existingDocId
      );
      setAnonRating(book.documentId, value, response.data.documentId);
      if (!existingDocId) {
        renameBookRating(tempDocId, response.data.documentId, response.data.id);
      }
    } catch {
      if (prevAnon) {
        setAnonRating(book.documentId, prevAnon.value, existingDocId);
        if (existingDocId) {
          patchBookRating(existingDocId, prevAnon.value, "update");
        } else {
          removeBookRating(tempDocId);
        }
      } else {
        removeAnonRating(book.documentId);
        removeBookRating(tempDocId);
      }
      showToast("Couldn't save your rating, please try again.");
    }
  };

  const stars = Array.from({ length: 5 }).map((_, i) => {
    let icon;

    if (hoveredStar !== null) {
      icon =
        i <= hoveredStar ? (
          <span
            onClick={async (e) => {
              e.stopPropagation();
              if (pendingRef.current) return;
              pendingRef.current = true;
              try {
                if (isLoggedin) {
                  await rateAsUser(i + 1);
                } else {
                  await rateAsAnon(i + 1);
                }
              } finally {
                pendingRef.current = false;
              }
            }}
          >
            <IconStarFilled color="#f7e66f" />
          </span>
        ) : (
          <IconStar />
        );
    } else if (userHasRated && userRating) {
      icon =
        i < userRating ? (
          <IconStarFilled color="#b36f00" />
        ) : (
          <IconStar color="#b36f00" />
        );
    } else {
      icon = i < averageRatingEven ? <IconStarFilled /> : <IconStar />;
    }

    return (
      <span
        onMouseDown={(e) => e.stopPropagation()}
        key={i}
        onMouseEnter={() => setHoveredStar(i)}
        onMouseLeave={() => setHoveredStar(null)}
      >
        {icon}
      </span>
    );
  });

  return (
    <>
      <div
        className="star-rating"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {stars}
        {bookRatings && (
          <p className="pl-[10px]">({bookRatings.length || 0})</p>
        )}
      </div>
    </>
  );
};

export default StarRating;

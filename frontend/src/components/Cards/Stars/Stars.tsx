import React, { useState, useMemo } from "react";
import type { Book } from "../../../types/book";
import type { User, UserRating } from "../../../types/user";
import IconStarFilled from "../../logos/IconStarFilled";
import IconStar from "../../logos/IconStar";
import rateBook from "../../../services/rateBook";
import fetchData from "../../../services/fetchData";
import { BASE_URL } from "../../../config/api";
import checkLoginStatus from "../../../services/checkLoginStatus";
import { useAnonData } from "../../../contexts/anonDataContext";

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
  const { anonRatings, setAnonRating } = useAnonData();

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

  const refreshBook = async () => {
    const responseBook = await fetchData<{ data: Book }>(
      BASE_URL + `/api/books/${book.documentId}?populate=*`
    );
    setBooks((prev) =>
      prev.map((b) =>
        b.documentId === book.documentId ? responseBook.data : b
      )
    );
  };

  const stars = Array.from({ length: 5 }).map((_, i) => {
    let icon;

    if (hoveredStar !== null) {
      icon =
        i <= hoveredStar ? (
          <span
            onClick={async (e) => {
              e.stopPropagation();
              if (isLoggedin) {
                await rateBook(i, userRatingId, userHasRated, user, book);
                await refreshBook();
                const responseUser = await checkLoginStatus();
                setUser(responseUser);
              } else {
                const response = await rateBook(
                  i,
                  null,
                  false,
                  undefined,
                  book,
                  anonRatings[book.documentId]?.ratingDocumentId
                );
                setAnonRating(book.documentId, i + 1, response.data.documentId);
                await refreshBook();
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

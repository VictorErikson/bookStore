import React, { useState, useMemo } from "react";
import type { Book } from "../../../types/book";
import type { User, UserRating } from "../../../types/user";
import IconStarFilled from "../../logos/IconStarFilled";
import IconStar from "../../logos/IconStar";
import rateBook from "../../../services/rateBook";
import fetchData from "../../../services/fetchData";
import { BASE_URL } from "../../../config/api";
import checkLoginStatus from "../../../services/checkLoginStatus";
// import checkLoginStatus from "../../../services/checkLoginStatus";

interface StarRatingProps {
  book: Book;
  user?: User;
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
  setWarningMsg,
  isLoggedin,
  setBooks,
  setUser,
}) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  //   const [isLoggedin, setIsLoggedin] = useState(false);
  //   let bookDocumentIds: string[] = [];
  const bookRatings = book.ratings;
  //   if (bookRatings) {
  //     bookDocumentIds = bookRatings.map((rating) => rating.documentId);
  //   }
  //   const userRating = book.ratings.find((rating) => rating.users_permissions_user?.documentId === userHasRated.documentId)

  //Byttes ut Mot Memo

  //   let userRating = null;
  //   let userRatingId = null;
  //   let userHasRated = false;
  const { userRating, userRatingId, userHasRated } = useMemo(() => {
    if (!user?.ratings)
      return { userRating: null, userRatingId: null, userHasRated: false };

    const match = user.ratings.find(
      (rating) => rating.book?.documentId === book.documentId
    );

    return {
      userRating: match?.rating ?? null,
      userRatingId: match ?? null,
      userHasRated: !!match,
    };
  }, [user?.ratings, book.documentId]);
  //check loginstatus

  //   useEffect(() => {
  //     const fetchLoginStatus = async () => {
  //       const status = await checkLoginStatus();
  //       setIsLoggedin(!!status);
  //     };
  //     fetchLoginStatus();
  //   }, []);

  //Byttes ut Mot Memo

  //   if (userRatings) {
  //     const match = user?.ratings.find(
  //       (rating) => rating.book?.documentId === book.documentId
  //     );

  //     userHasRated = !!match; // true if a match was found
  //     userRating = match?.rating ?? null;
  //     userRatingId = match ?? null;
  //   }

  //count our avg rating

  let totalRatings = 0;

  let averageRatingEven: number;

  if (bookRatings) {
    bookRatings.forEach((rating) => {
      totalRatings += rating.rating;
    });
    const averageRatingUneven = totalRatings / bookRatings.length;
    averageRatingEven = Math.round(averageRatingUneven);
  }
  //   console.log(
  //     "StarsRating- userRatingId:",
  //     userRatingId,
  //     "userHasRated: ",
  //     userHasRated
  //   );
  const stars = Array.from({ length: 5 }).map((_, i) => {
    let icon;

    if (hoveredStar !== null) {
      icon =
        i <= hoveredStar ? (
          <span
            onClick={async () => {
              if (isLoggedin) {
                await rateBook(i, userRatingId, userHasRated, user, book);
                // console.log(response);
                const responseBook = await fetchData<{ data: Book }>(
                  BASE_URL + `/api/books/${book.documentId}?populate=*`
                );
                // const responseUser = await fetchData<{ data: User }>(
                //   BASE_URL + `/api/users/${user?.documentId}?populate=*`
                // );
                const responseUser = await checkLoginStatus();
                setUser(responseUser);
                setBooks((prev) =>
                  prev.map((b) =>
                    b.documentId === book.documentId ? responseBook.data : b
                  )
                );
              } else {
                setWarningMsg("Please login to be able to rate");
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

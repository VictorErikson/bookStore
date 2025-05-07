import React, { useState, useEffect } from "react";
import type { Rating } from "../../../types/book";
import type { UserRating } from "../../../types/user";
import IconStarFilled from "../../logos/IconStarFilled";
import IconStar from "../../logos/IconStar";
import rateBook from "../../../services/rateBook";
import checkLoginStatus from "../../../services/checkLoginStatus";

interface StarRatingProps {
  bookRatings: Rating[]; // e.g., 3.6
  userRatings?: UserRating[];
  bookId: string;
  setWarningMsg: (msg: string) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  bookRatings,
  userRatings,
  bookId,
  setWarningMsg,
}) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const bookDocumentIds = bookRatings.map((rating) => rating.documentId);

  let userRating = null;
  let userHasRated = false;

  //check loginstatus

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const status = await checkLoginStatus();
      setIsLoggedin(!!status);
    };
    fetchLoginStatus();
  }, []);

  if (userRatings) {
    const match = userRatings.find((rating) =>
      bookDocumentIds.includes(rating.documentId)
    );

    userHasRated = !!match; // true if a match was found
    userRating = match?.rating ?? null;
  }

  //count our avg rating

  let totalRatings = 0;

  bookRatings.forEach((rating) => {
    totalRatings += rating.rating;
  });
  const averageRatingUneven = totalRatings / bookRatings.length;
  const averageRatingEven = Math.round(averageRatingUneven);

  const stars = Array.from({ length: 5 }).map((_, i) => {
    let icon;

    if (hoveredStar !== null) {
      icon =
        i <= hoveredStar ? (
          <span
            onClick={() =>
              isLoggedin
                ? rateBook(i, bookId)
                : setWarningMsg("Please login to be able to rate")
            }
          >
            <IconStarFilled color="#f7e66f" />
          </span>
        ) : (
          <IconStar />
        );
    } else if (userHasRated) {
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
        <p className="pl-[10px]">({bookRatings.length || 0})</p>
      </div>
    </>
  );
};

export default StarRating;

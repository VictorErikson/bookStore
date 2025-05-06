import React, { useState } from "react";
import type { Rating } from "../../../types/book";
import type { UserRating } from "../../../types/user";

interface StarRatingProps {
  values: Rating[]; // e.g., 3.6
  interactive?: boolean;
  userRatings?: UserRating[];
}

const StarRating: React.FC<StarRatingProps> = ({
  values,
  interactive = false,
  userRatings,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayValue = hovered ?? values;

  const getFill = (star: number) => {
    if (displayValue >= star) return "100%"; // full
    if (displayValue >= star - 0.5) return "50%"; // half
    return "0%"; // empty
  };

  return (
    <div
      className="star-rating"
      style={{
        display: "flex",
        gap: "4px",
        cursor: interactive ? "pointer" : "default",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercent = getFill(star);
        return (
          <svg
            key={star}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(null)}
            onClick={() => interactive && onRate?.(star)}
          >
            <defs>
              <linearGradient id={`starGrad-${star}`}>
                <stop offset={fillPercent} stopColor="#facc15" />
                <stop offset={fillPercent} stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#starGrad-${star})`}
              d="M12 17.3l6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;

import type { RefObject } from "react";
import ReviewCard from "./ReviewCard";

interface Props {
  reviewsRef: RefObject<HTMLElement>;
}

const ReviewsPart: React.FC<Props> = ({ reviewsRef }) => {
  return (
    <div
      ref={reviewsRef}
      className="w-screen bg-[#EEEBE8] py-[120px] text-[#32302D] mb-[80px]"
    >
      <div className="info flex flex-col items-center justify-center">
        <h2 className="text-4xl font-sans font-bold mb-[16px]">
          Loved by thousands of readers
        </h2>
        <p className="mb-[24px] text-xl">
          More than 52 000 people have given BookStore the highest score!
        </p>
        <div className="flex gap-[14px]">
          <ReviewCard
            name={"The Bookmal"}
            text={
              "Really great and a very large selection of both books and magazines!"
            }
          />
          <ReviewCard
            name={"Cookiekaka"}
            text={
              "I love this site, you can read lots of books without needing to go to a library."
            }
          />
          <ReviewCard
            name={"Ann-Sofie G."}
            text={
              "Many different books for all tastes. Easy to use. Satisfied!"
            }
          />
          <ReviewCard
            name={"Siv E."}
            text={
              "Fantastic that my daughters are reading their stories on their own."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewsPart;

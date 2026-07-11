import type { RefObject } from "react";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import CardsSection from "../Cards/CardsSection";
import ReviewsPart from "../ReviewsPart/ReviewsPart";

interface Props {
  books: Book[] | null;
  user?: User;
  setWarningMsg: (msg: string) => void;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  starredBooks: Book[];
  ratedBooks: Book[];
  sortRatings?: boolean;
  onClickScroll?: () => void;
  childrensBooksRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
}

const ChildrenPart: React.FC<Props> = ({
  books,
  user,
  setWarningMsg,
  isLoggedin,
  setIsLoggedin,
  setBooks,
  setUser,
  starredBooks,
  ratedBooks,
  onClickScroll,
  childrensBooksRef,
  reviewsRef,
}) => {
  return (
    <div>
      <div className="flex flex-col w-full bg-[#100020] pb-[15px]">
        <div className="top flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between self-center text-white px-6 md:px-10 lg:px-[92px] w-full max-w-[1300px] pb-[50px] lg:pb-[85px] pt-[40px] lg:pt-[60px] items-center">
          <img
            className="w-full max-w-[420px] lg:w-[550px]"
            src={`${import.meta.env.BASE_URL}assets/child.jpg`}
            alt=""
          />
          <div className="info max-w-[500px]">
            <h2 className="text-3xl font-sans font-bold pr-0 lg:pr-[150px] mb-[12px]">
              Share the joy of reading
            </h2>
            <p className="mb-[24px]">
              Encourage a reading habit with exciting stories for all ages.
              Discover our delightful selection of books specially chosen to
              spark curiosity and imagination in children.
            </p>
            <button
              className="py-[12px] px-[20px] my-button hoverColor rounded-lg mt-[40px] hover:cursor-pointer"
              onClick={onClickScroll}
            >
              Childrens Section
            </button>
          </div>
        </div>
        <div ref={childrensBooksRef}>
          <CardsSection
            books={books}
            user={user}
            setWarningMsg={setWarningMsg}
            isLoggedin={isLoggedin}
            setIsLoggedin={setIsLoggedin}
            setBooks={setBooks}
            setUser={setUser}
            starredBooks={starredBooks}
            ratedBooks={ratedBooks}
            title={`Popular children's books 🦄`}
          />
        </div>
      </div>
      <ReviewsPart reviewsRef={reviewsRef} />
    </div>
  );
};

export default ChildrenPart;

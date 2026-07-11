import { useState } from "react";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import ScrollableCards from "./ScrollableCards";
import SortingButton from "./SortingButton";
import type { SortOptionWithRatings } from "../../types/sorting";

interface Props {
  books: Book[];
  user?: User | null;
  setWarningMsg: (msg: string) => void;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  starredBooks: Book[];
  ratedBooks: Book[];
  title: string;
  sortRatings?: boolean;
}

const CardsSection: React.FC<Props> = ({
  books,
  user,
  setWarningMsg,
  isLoggedin,
  setIsLoggedin,
  setBooks,
  setUser,
  starredBooks,
  ratedBooks,
  title,
  sortRatings,
}) => {
  const [sortBy, setSortBy] = useState<SortOptionWithRatings>("Title: A-z");

  return (
    <>
      <div className="flex w-full items-end justify-between pr-[16px] lg:pr-0">
        <h3 className="text-2xl lg:text-3xl text-white pl-[16px] lg:pl-[25px]">
          {title}
        </h3>
        <SortingButton
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortRatings={sortRatings}
        />
      </div>
      <ScrollableCards
        books={books}
        user={user}
        setWarningMsg={setWarningMsg}
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
        setBooks={setBooks}
        setUser={setUser}
        starredBooks={starredBooks}
        ratedBooks={ratedBooks}
        sortBy={sortBy}
      />
    </>
  );
};

export default CardsSection;

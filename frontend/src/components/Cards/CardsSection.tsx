import { useState } from "react";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import ScrollableCards from "./ScrollableCards";
import SortingButton from "./SortingButton";
import type { SortOption } from "../../types/sorting";

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
  const [sortBy, setSortBy] = useState<
    | "Title: A-z"
    | "Title: Z-a"
    | "Author: A-z"
    | "Author: Z-a"
    | "Price: Low to High"
    | "Price: High to Low"
    | "My Rating: High to Low"
    | "My Rating: Low to High"
  >("Title: A-z");

  return (
    <>
      <div className="flex w-full items-end justify-between">
        <h3 className="text-3xl text-white pl-[25px]">{title}</h3>
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

import type { RefObject } from "react";
import CardsSection from "../../components/Cards/CardsSection";
import ChildrenPart from "../../components/Children/ChildrenPart";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import InspoPart from "../../components/InspoPart/InspoPart";

interface Props {
  books: Book[];
  user?: User;
  setWarningMsg: (msg: string) => void;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  starredBooks: Book[];
  ratedBooks: Book[];
  childrensBooksRef: RefObject<HTMLElement>;
  allBooksRef: RefObject<HTMLElement>;
  favouritesRef: RefObject<HTMLElement>;
  ratedRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
}

const LogedinHome: React.FC<Props> = ({
  books,
  user,
  setWarningMsg,
  isLoggedin,
  setIsLoggedin,
  setBooks,
  setUser,
  starredBooks,
  ratedBooks,
  childrensBooksRef,
  allBooksRef,
  favouritesRef,
  ratedRef,
  reviewsRef,
}) => {
  return (
    <div className="flex gap-[20px] w-full overflow-hidden box-border h-full flex flex-col ">
      {/* {user.starred.length > 0 && ( */}
      {starredBooks.length > 0 && (
        <div ref={favouritesRef}>
          <CardsSection
            books={starredBooks.filter(
              (b, i, a) =>
                a.findIndex((x) => x.documentId === b.documentId) === i
            )}
            user={user}
            setWarningMsg={setWarningMsg}
            isLoggedin={isLoggedin}
            setIsLoggedin={setIsLoggedin}
            setBooks={setBooks}
            setUser={setUser}
            starredBooks={starredBooks}
            ratedBooks={ratedBooks}
            title={`${user?.username}s Favourites ❤️`}
          />
        </div>
      )}
      {ratedBooks.length > 0 && (
        <div ref={ratedRef}>
          <CardsSection
            books={ratedBooks.filter(
              (b, i, a) =>
                a.findIndex((x) => x.documentId === b.documentId) === i
            )}
            user={user}
            setWarningMsg={setWarningMsg}
            isLoggedin={isLoggedin}
            setIsLoggedin={setIsLoggedin}
            setBooks={setBooks}
            setUser={setUser}
            starredBooks={starredBooks}
            ratedBooks={ratedBooks}
            title={`${user?.username}s Ratings ⭐`}
            sortRatings={true}
          />
        </div>
      )}
      <InspoPart />
      <ChildrenPart
        onClickScroll={() =>
          childrensBooksRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        childrensBooksRef={childrensBooksRef}
        books={books.filter((book) => book.age === "child")}
        user={user}
        setWarningMsg={setWarningMsg}
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
        setBooks={setBooks}
        setUser={setUser}
        starredBooks={starredBooks}
        ratedBooks={ratedBooks}
        reviewsRef={reviewsRef}
      />
      <div ref={allBooksRef}>
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
          title={"Books 📖"}
        />
      </div>
    </div>
  );
};

export default LogedinHome;

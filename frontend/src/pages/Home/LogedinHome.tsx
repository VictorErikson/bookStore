import type { RefObject } from "react";
import CardsSection from "../../components/Cards/CardsSection";
import SectionSkeleton from "../../components/Cards/SectionSkeleton";
import EmptySection from "../../components/Cards/EmptySection";
import ChildrenPart from "../../components/Children/ChildrenPart";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import InspoPart from "../../components/InspoPart/InspoPart";

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
  booksReady: boolean;
  childrensBooksRef: RefObject<HTMLDivElement | null>;
  allBooksRef: RefObject<HTMLDivElement | null> | null;
  favouritesRef: RefObject<HTMLDivElement | null>;
  ratedRef: RefObject<HTMLDivElement | null>;
  reviewsRef: RefObject<HTMLDivElement | null>;
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
  booksReady,
  childrensBooksRef,
  allBooksRef,
  favouritesRef,
  ratedRef,
  reviewsRef,
}) => {
  return (
    <div className="flex gap-[20px] w-full overflow-hidden box-border h-full flex flex-col ">
      {starredBooks.length > 0 ? (
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
      ) : booksReady ? (
        <div ref={favouritesRef}>
          <EmptySection
            title={`${user?.username}s Favourites ❤️`}
            message="No favourites yet. Tap the ❤️ on any book you love and it'll be waiting for you here."
          />
        </div>
      ) : null}
      {ratedBooks.length > 0 ? (
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
      ) : booksReady ? (
        <div ref={ratedRef}>
          <EmptySection
            title={`${user?.username}s Ratings ⭐`}
            message="You haven't rated anything yet. Give a book some stars and it'll show up here, your next favorite read might be one click away."
          />
        </div>
      ) : null}
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
        {!booksReady ? (
          <SectionSkeleton title={`Books 📖`} />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default LogedinHome;

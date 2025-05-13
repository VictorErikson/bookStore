import Card from "../../components/Cards/Card";
import CardsSection from "../../components/Cards/CardsSection";
import ScrollableCards from "../../components/Cards/ScrollableCards";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";

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
}) => {
  return (
    <div className="flex gap-[20px] w-screen overflow-hidden box-border h-full flex flex-col ">
      {/* {user.starred.length > 0 && ( */}
      {starredBooks.length > 0 && (
        <CardsSection
          books={starredBooks.filter(
            (b, i, a) => a.findIndex((x) => x.documentId === b.documentId) === i
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
      )}
      {ratedBooks.length > 0 && (
        <CardsSection
          books={ratedBooks.filter(
            (b, i, a) => a.findIndex((x) => x.documentId === b.documentId) === i
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
      )}

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
  );
};

export default LogedinHome;

import Card from "../../components/Cards/Card";
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
        <>
          <h3 className="text-3xl text-white pl-[25px]">
            {user?.username}s Favourites ❤️
          </h3>
          <ScrollableCards
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
          />
        </>
      )}
      {ratedBooks.length > 0 && (
        <>
          <h3 className="text-3xl text-white pl-[25px]">
            {user?.username}s Ratings ⭐
          </h3>
          <ScrollableCards
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
          />
        </>
      )}
      <h3 className="text-3xl text-white pl-[25px]">Books 📖</h3>
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
      />
    </div>
  );
};

export default LogedinHome;

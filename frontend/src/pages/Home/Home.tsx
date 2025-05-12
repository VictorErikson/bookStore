import { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import fetchBooks from "../../services/fetchBooks";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import Warning from "../../components/warningMsgs/Warning";
import { BASE_URL } from "../../config/api";
import fetchData from "../../services/fetchData";
import BookCarousel from "../../components/BookCarousel/BookCarousel";
import TrendingInfoBox from "../../components/TrendingInfoBox/TrendingInfoBox";
import LogedinHome from "./LogedinHome";
import ScrollableCards from "../../components/Cards/ScrollableCards";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<Props> = ({
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [starredBooks, setStarredBooks] = useState<Book[]>([]);
  const [ratedBooks, setRatedBooks] = useState<Book[]>([]);

  const fetchBookById = async (documentId: string): Promise<Book> => {
    const response = await fetchData<{ data: Book }>(
      `${BASE_URL}/api/books/${documentId}?populate=*`
    );
    return response.data;
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    if (!user) return;
    const go = async () => {
      const starred = await Promise.all(
        user.starred.map((b) => fetchBookById(b.documentId))
      );
      setStarredBooks(starred);

      const rated = await Promise.all(
        user.ratings.map((r) => fetchBookById(r.book.documentId))
      );
      setRatedBooks(rated);
    };
    go();
  }, [user]);

  return (
    <main className=" box-border">
      {warningMsg && <Warning msg={warningMsg} setWarningMsg={setWarningMsg} />}
      {user ? (
        <LogedinHome
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
      ) : (
        <>
          <TrendingInfoBox />
          <BookCarousel />
          <h3 className="text-3xl text-white pl-[25px]">Books 📖</h3>
          <ScrollableCards
            books={books}
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
    </main>
  );
};

export default Home;

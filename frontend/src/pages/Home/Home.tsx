import { useEffect, useRef, useState } from "react";
import fetchBooks from "../../services/fetchBooks";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import Warning from "../../components/warningMsgs/Warning";
import { BASE_URL } from "../../config/api";
import fetchData from "../../services/fetchData";
import BookCarousel from "../../components/BookCarousel/BookCarousel";
import TrendingInfoBox from "../../components/TrendingInfoBox/TrendingInfoBox";
import LogedinHome from "./LogedinHome";
import CardsSection from "../../components/Cards/CardsSection";

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
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const trendingRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setTrendingBooks(
      books?.filter(
        (book) =>
          book.ratings &&
          book.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
            book.ratings?.length >=
            4
      )
    );
  }, [books]);

  return (
    <main className=" box-border">
      {warningMsg && <Warning msg={warningMsg} setWarningMsg={setWarningMsg} />}
      {user ? (
        <>
          <TrendingInfoBox
            onClickScroll={() =>
              trendingRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <BookCarousel />
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
          {trendingBooks && (
            <CardsSection
              books={trendingBooks}
              user={user}
              setWarningMsg={setWarningMsg}
              isLoggedin={isLoggedin}
              setIsLoggedin={setIsLoggedin}
              setBooks={setBooks}
              setUser={setUser}
              starredBooks={starredBooks}
              ratedBooks={ratedBooks}
              title={`Trending ⭐`}
            />
          )}
        </>
      ) : (
        <>
          <TrendingInfoBox
            onClickScroll={() =>
              trendingRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <BookCarousel />
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
            title={`Books 📖`}
          />
          {trendingBooks && (
            <>
              <CardsSection
                books={trendingBooks}
                user={user}
                setWarningMsg={setWarningMsg}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                setBooks={setBooks}
                setUser={setUser}
                starredBooks={starredBooks}
                ratedBooks={ratedBooks}
                title={`Trending ⭐`}
              />
            </>
          )}
        </>
      )}
    </main>
  );
};

export default Home;

import { useEffect, useRef, useState, type RefObject } from "react";
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
import SaleInfoBox from "../../components/SaleInfoBox/SaleInfoBox";
import { useTheme } from "../../contexts/ThemeContext";
import BookInfoBox from "../../components/BookInfoBox/BookInfoBox";
import { useBookInfo } from "../../contexts/bookInfoContext";
import ChildrenPart from "../../components/Children/ChildrenPart";
import InspoPart from "../../components/InspoPart/InspoPart";
import { useAnonData } from "../../contexts/anonDataContext";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  allBooksRef: RefObject<HTMLElement> | null;
  favouritesRef: RefObject<HTMLElement>;
  ratedRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
}

const Home: React.FC<Props> = ({
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
  allBooksRef,
  favouritesRef,
  ratedRef,
  reviewsRef,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [starredBooks, setStarredBooks] = useState<Book[]>([]);
  const [ratedBooks, setRatedBooks] = useState<Book[]>([]);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const trendingRef = useRef<HTMLDivElement>(null);
  const childrensBooksRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { bookInfoId, mousePos } = useBookInfo();
  const { anonLikes, anonRatings } = useAnonData();

  const anonStarredBooks = books.filter((b) =>
    anonLikes.includes(b.documentId)
  );
  const anonRatedBooks = books.filter((b) => anonRatings[b.documentId]);

  const fetchBookById = async (documentId: string): Promise<Book> => {
    const response = await fetchData<{ data: Book }>(
      `${BASE_URL}/api/books/${documentId}?populate=*`
    );
    return response.data;
  };

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    if (theme === "sale") {
      root.classList.add("bg-sale");
    } else {
      root.classList.remove("bg-sale");
    }
    if (theme === "darkmode") {
      root.classList.add("bg-dark");
    } else {
      root.classList.remove("bg-dark");
    }
  }, [theme]);

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
      const data = await fetchBooks();
      setBooks(data);

      const starred = await Promise.all(
        user.starred.map((b) => fetchBookById(b.documentId))
      );
      setStarredBooks(starred);

      const rated = await Promise.all(
        user.ratings
          .filter((r) => r.book)
          .map((r) => fetchBookById(r.book!.documentId))
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
      {bookInfoId && (
        <div
          style={{
            position: "fixed",
            top: mousePos.y + 10,
            left: mousePos.x + 10,
            zIndex: 1,
          }}
        >
          <BookInfoBox
            book={books.find((b) => b.documentId === bookInfoId)!}
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
      )}
      {user ? (
        <>
          {theme === "sale" ? (
            <SaleInfoBox
              onClickScroll={() =>
                trendingRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
          ) : (
            <TrendingInfoBox
              onClickScroll={() =>
                trendingRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
          )}
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
            onClickScroll={() =>
              childrensBooksRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            childrensBooksRef={childrensBooksRef}
            allBooksRef={allBooksRef}
            favouritesRef={favouritesRef}
            ratedRef={ratedRef}
            reviewsRef={reviewsRef}
          />
          {trendingBooks && (
            <div ref={trendingRef}>
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
            </div>
          )}
        </>
      ) : (
        <>
          {theme === "sale" ? (
            <SaleInfoBox
              onClickScroll={() =>
                trendingRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
          ) : (
            <TrendingInfoBox
              onClickScroll={() =>
                trendingRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
          )}
          <BookCarousel />
          {anonStarredBooks.length > 0 && (
            <div ref={favouritesRef}>
              <CardsSection
                books={anonStarredBooks}
                user={user}
                setWarningMsg={setWarningMsg}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                setBooks={setBooks}
                setUser={setUser}
                starredBooks={starredBooks}
                ratedBooks={ratedBooks}
                title={`Favourites ❤️`}
              />
            </div>
          )}
          {anonRatedBooks.length > 0 && (
            <div ref={ratedRef}>
              <CardsSection
                books={anonRatedBooks}
                user={user}
                setWarningMsg={setWarningMsg}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                setBooks={setBooks}
                setUser={setUser}
                starredBooks={starredBooks}
                ratedBooks={ratedBooks}
                title={`Ratings ⭐`}
                sortRatings={true}
              />
            </div>
          )}
          <InspoPart />
          <ChildrenPart
            onClickScroll={() =>
              childrensBooksRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            childrensBooksRef={childrensBooksRef}
            reviewsRef={reviewsRef}
            books={books.filter((book) => book.age === "child")}
            user={user}
            setWarningMsg={setWarningMsg}
            isLoggedin={isLoggedin}
            setIsLoggedin={setIsLoggedin}
            setBooks={setBooks}
            setUser={setUser}
            starredBooks={starredBooks}
            ratedBooks={ratedBooks}
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
              title={`Books 📖`}
            />
          </div>
          {trendingBooks && (
            <div ref={trendingRef}>
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
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Home;

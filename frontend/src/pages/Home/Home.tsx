import { useEffect, useRef, useState, type RefObject } from "react";
import fetchBooks from "../../services/fetchBooks";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import Warning from "../../components/warningMsgs/Warning";
import BookCarousel from "../../components/BookCarousel/BookCarousel";
import TrendingInfoBox from "../../components/TrendingInfoBox/TrendingInfoBox";
import LogedinHome from "./LogedinHome";
import CardsSection from "../../components/Cards/CardsSection";
import SectionSkeleton from "../../components/Cards/SectionSkeleton";
import SaleInfoBox from "../../components/SaleInfoBox/SaleInfoBox";
import { useTheme } from "../../contexts/ThemeContext";
import BookInfoBox from "../../components/BookInfoBox/BookInfoBox";
import { useBookInfo } from "../../contexts/bookInfoContext";
import ChildrenPart from "../../components/Children/ChildrenPart";
import InspoPart from "../../components/InspoPart/InspoPart";
import { useAnonData } from "../../contexts/anonDataContext";
import {
  BOOKS_CACHE_KEY,
  readCache,
  writeCache,
} from "../../services/sessionCache";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  allBooksRef: RefObject<HTMLDivElement | null> | null;
  favouritesRef: RefObject<HTMLDivElement | null>;
  ratedRef: RefObject<HTMLDivElement | null>;
  reviewsRef: RefObject<HTMLDivElement | null>;
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
  const [books, setBooks] = useState<Book[]>(
    () => readCache<Book[]>(BOOKS_CACHE_KEY) ?? []
  );
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [serverWaking, setServerWaking] = useState(false);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const prevUserId = useRef<string | null>(user?.documentId ?? null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const childrensBooksRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { bookInfoId, mousePos } = useBookInfo();
  const { anonLikes, anonRatings } = useAnonData();

  const anonStarredBooks = books.filter((b) =>
    anonLikes.includes(b.documentId)
  );
  const anonRatedBooks = books.filter((b) => anonRatings[b.documentId]);

  const starredBooks = books.filter((b) =>
    user?.starred.some((s) => s.documentId === b.documentId)
  );
  const ratedBooks = books.filter((b) =>
    user?.ratings.some((r) => r.book?.documentId === b.documentId)
  );

  const booksReady = books.length > 0 || !booksLoading;

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
    if (books.length > 0) writeCache(BOOKS_CACHE_KEY, books);
  }, [books]);

  useEffect(() => {
    const controller = new AbortController();
    setBooksLoading(true);
    setBooksError(false);
    const slowTimer = window.setTimeout(() => setServerWaking(true), 2500);

    const loadBooks = async () => {
      try {
        const data = await fetchBooks({ retry: true, signal: controller.signal });
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        if (!controller.signal.aborted) setBooksError(true);
      } finally {
        window.clearTimeout(slowTimer);
        setServerWaking(false);
        if (!controller.signal.aborted) setBooksLoading(false);
      }
    };

    loadBooks();
    return () => {
      window.clearTimeout(slowTimer);
      controller.abort();
    };
  }, [loadAttempt]);

  useEffect(() => {
    const userId = user?.documentId ?? null;
    if (userId === prevUserId.current) return;
    prevUserId.current = userId;
    if (!userId) return;

    const controller = new AbortController();
    const refreshBooks = async () => {
      try {
        const data = await fetchBooks({ retry: true, signal: controller.signal });
        setBooks(data);
      } catch (error) {
        console.error("Failed to refresh books:", error);
      }
    };
    refreshBooks();
    return () => controller.abort();
  }, [user?.documentId]);

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
      {serverWaking && books.length === 0 && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#201030] text-white px-6 py-3 rounded-full shadow-2xl">
          <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-sm">
            Waking up the bookstore server, this can take up to a minute...
          </p>
        </div>
      )}
      {booksError && books.length === 0 && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#7a1f2b] text-white px-6 py-3 rounded-full shadow-2xl">
          <p className="text-sm">Couldn't reach the bookstore server.</p>
          <button
            onClick={() => setLoadAttempt((a) => a + 1)}
            className="text-sm underline hover:cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}
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
            booksReady={booksReady}
            childrensBooksRef={childrensBooksRef}
            allBooksRef={allBooksRef}
            favouritesRef={favouritesRef}
            ratedRef={ratedRef}
            reviewsRef={reviewsRef}
          />
          {!booksReady ? (
            <SectionSkeleton title={`Trending ⭐`} />
          ) : (
            trendingBooks.length > 0 && (
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
            )
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
                title={`Books 📖`}
              />
            )}
          </div>
          {!booksReady ? (
            <SectionSkeleton title={`Trending ⭐`} />
          ) : (
            trendingBooks.length > 0 && (
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
            )
          )}
        </>
      )}
    </main>
  );
};

export default Home;

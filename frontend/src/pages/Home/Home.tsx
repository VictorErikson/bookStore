import { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import fetchBooks from "../../services/fetchBooks";
import type { Book } from "../../types/book";
import type { StarredBook, User } from "../../types/user";
import Warning from "../../components/warningMsgs/Warning";
import fetchData from "../../services/fetchData";
import { BASE_URL } from "../../config/api";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Home: React.FC<Props> = ({ user, setUser }) => {
  const [books, setBooks] = useState<Book[]>([]);
  // const [userLikedIds, setUserLikedIds] = useState<string>();
  // const [userRatedIds, setUserRatedIds] = useState<string>();

  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  const refreshBook = async (bookId: string) => {
    const response = await fetchData<{ data: Book }>(
      BASE_URL + `/api/books/${bookId}?populate=*`
    );
    console.log("response in refreshBook: ", response);
    const updatedBook = response.data;

    setBooks((prev) =>
      prev.map((book) => (book.documentId === bookId ? updatedBook : book))
    );
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
  return (
    <main className="p-[25px] box-border">
      {warningMsg && <Warning msg={warningMsg} setWarningMsg={setWarningMsg} />}
      {user ? (
        <div className="flex gap-[20px] w-screen overflow-hidden box-border h-[1000px] flex flex-col pl-[20px]">
          <h3 className="text-3xl text-white">{user.username}s Favourites</h3>
          <div className="flex">
            {user.starred.map(
              (book: StarredBook) =>
                book.publishedAt !== null && (
                  <Card
                    key={book.id}
                    book={book}
                    user={user}
                    setWarningMsg={setWarningMsg}
                    refreshBook={() => refreshBook(book.documentId)}
                  />
                )
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-[20px] w-screen overflow-hidden box-border h-[500px] flex items-center pl-[20px]">
          {books.map((book: Book) => (
            <Card
              key={book.id}
              book={book}
              user={user}
              setWarningMsg={setWarningMsg}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;

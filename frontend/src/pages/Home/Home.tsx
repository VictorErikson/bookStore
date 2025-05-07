import { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import fetchBooks from "../../services/fetchBooks";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import Warning from "../../components/warningMsgs/warning";
import { colors } from "../../config/colors";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

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
    <main
      style={{ background: colors.background }}
      className="h-auto p-[25px] box-border"
    >
      {warningMsg && <Warning msg={warningMsg} setWarningMsg={setWarningMsg} />}
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
    </main>
  );
};

export default Home;

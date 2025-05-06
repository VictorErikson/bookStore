import { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import fetchBooks from "../../services/fetchBooks";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>();

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
    <body className="h-auto bg-[linear-gradient(180deg,_#421862_50%,_#290c41)] p-[25px] box-border">
      <div className="flex gap-[20px] w-screen overflow-hidden box-border">
        {books.map((book: Book) => (
          <Card book={book} user={user} />
        ))}
      </div>
    </body>
  );
};

export default Home;

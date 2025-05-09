import { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import fetchBooks from "../../services/fetchBooks";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import Warning from "../../components/warningMsgs/Warning";
import { BASE_URL } from "../../config/api";
import fetchData from "../../services/fetchData";
import BookCarousel from "../../components/BookCarousel/BookCarousel";

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
    <main className="p-[25px] box-border">
      {warningMsg && <Warning msg={warningMsg} setWarningMsg={setWarningMsg} />}
      {user ? (
        <div className="flex gap-[20px] w-screen overflow-hidden box-border h-full flex flex-col pl-[20px]">
          {/* {user.starred.length > 0 && ( */}
          {starredBooks.length > 0 && (
            <>
              <h3 className="text-3xl text-white">
                {user.username}s Favourites ❤️
              </h3>
              <div className="flex gap-[25px]">
                {starredBooks
                  .filter(
                    (b, i, a) =>
                      a.findIndex((x) => x.documentId === b.documentId) === i
                  )
                  .map((book) => (
                    <Card
                      key={`liked-${book.documentId}`}
                      book={book}
                      user={user}
                      setWarningMsg={setWarningMsg}
                      isLoggedin={isLoggedin}
                      setIsLoggedin={setIsLoggedin}
                      setBooks={setBooks}
                      setUser={setUser}
                    />
                  ))}
              </div>
            </>
          )}
          {/* {user.ratings.length > 0 && ( */}
          {ratedBooks.length > 0 && (
            <>
              <h3 className="text-3xl text-white">
                {user.username}s Ratings ⭐
              </h3>
              <div className="flex gap-[25px] pb-[25px]">
                {ratedBooks
                  .filter(
                    (b, i, a) =>
                      a.findIndex((x) => x.documentId === b.documentId) === i
                  )
                  .map((book) => (
                    <Card
                      key={`ratings-${book.documentId}`}
                      book={book}
                      user={user}
                      setWarningMsg={setWarningMsg}
                      isLoggedin={isLoggedin}
                      setIsLoggedin={setIsLoggedin}
                      setBooks={setBooks}
                      setUser={setUser}
                    />
                  ))}
              </div>
            </>
          )}
          <h3 className="text-3xl text-white">Books 📖</h3>
          <div className="flex gap-[25px] pb-[25px]">
            {books.map((book: Book) => (
              <Card
                key={`books-${book.documentId}`}
                book={book}
                user={user}
                setWarningMsg={setWarningMsg}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                setBooks={setBooks}
                setUser={setUser}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-[20px] w-screen overflow-hidden box-border py-[45px] flex items-center pl-[20px]">
            {books.map((book: Book) => (
              <Card
                key={book.documentId}
                book={book}
                user={user}
                setWarningMsg={setWarningMsg}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
                setBooks={setBooks}
              />
            ))}
          </div>
          <BookCarousel />
        </>
      )}
    </main>
  );
};

export default Home;

//INNAN DUPLIKETTER

// import { useEffect, useState } from "react";
// import Card from "../../components/Cards/Card";
// import fetchBooks from "../../services/fetchBooks";
// import type { Book } from "../../types/book";
// import type { StarredBook, User, UserRating } from "../../types/user";
// import Warning from "../../components/warningMsgs/Warning";

// interface Props {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   isLoggedin: boolean;
//   setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Home: React.FC<Props> = ({
//   user,
//   setUser,
//   isLoggedin,
//   setIsLoggedin,
// }) => {
//   const [books, setBooks] = useState<Book[]>([]);

//   const [warningMsg, setWarningMsg] = useState<string | null>(null);

//   useEffect(() => {
//     const loadBooks = async () => {
//       try {
//         const data = await fetchBooks();
//         setBooks(data);
//       } catch (error) {
//         console.error("Failed to fetch books:", error);
//       }
//     };

//     loadBooks();
//   }, []);
//   return (
//     <main className="p-[25px] box-border">
//       {warningMsg && <Warning msg={warningMsg} setWarningMsg={setWarningMsg} />}
//       {user ? (
//         <div className="flex gap-[20px] w-screen overflow-hidden box-border h-full flex flex-col pl-[20px]">
//           {user.starred.length > 0 && (
//             <>
//               <h3 className="text-3xl text-white">
//                 {user.username}s Favourites ❤️
//               </h3>
//               <div className="flex gap-[25px]">
//                 {user.starred.map(
//                   (book: StarredBook) =>
//                     book.publishedAt !== null && (
//                       <Card
//                         key={book.id}
//                         book={book}
//                         user={user}
//                         setWarningMsg={setWarningMsg}
//                         isLoggedin={isLoggedin}
//                         setIsLoggedin={setIsLoggedin}
//                         setBooks={setBooks}
//                         setUser={setUser}
//                       />
//                     )
//                 )}
//               </div>
//             </>
//           )}
//           {user.ratings.length > 0 && (
//             <>
//               <h3 className="text-3xl text-white">
//                 {user.username}s Ratings ⭐
//               </h3>
//               <div className="flex gap-[25px] pb-[25px]">
//                 {user.ratings.map(
//                   (rating: UserRating) =>
//                     rating.book.publishedAt !== null && (
//                       <Card
//                         key={rating.id}
//                         book={rating.book}
//                         user={user}
//                         setWarningMsg={setWarningMsg}
//                         isLoggedin={isLoggedin}
//                         setIsLoggedin={setIsLoggedin}
//                         setBooks={setBooks}
//                         setUser={setUser}
//                       />
//                     )
//                 )}
//               </div>
//             </>
//           )}
//           <h3 className="text-3xl text-white">Books 📖</h3>
//           <div className="flex gap-[25px] pb-[25px]">
//             {books.map((book: Book) => (
//               <Card
//                 key={book.id}
//                 book={book}
//                 user={user}
//                 setWarningMsg={setWarningMsg}
//                 isLoggedin={isLoggedin}
//                 setIsLoggedin={setIsLoggedin}
//                 setBooks={setBooks}
//                 setUser={setUser}
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="flex gap-[20px] w-screen overflow-hidden box-border h-[500px] flex items-center pl-[20px]">
//           {books.map((book: Book) => (
//             <Card
//               key={book.id}
//               book={book}
//               user={user}
//               setWarningMsg={setWarningMsg}
//               isLoggedin={isLoggedin}
//               setIsLoggedin={setIsLoggedin}
//               setBooks={setBooks}
//             />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// };

// export default Home;

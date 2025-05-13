import { BASE_URL } from "../../config/api";
import { useTheme } from "../../contexts/ThemeContext";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import LikeBtn from "../Cards/LikeBtn/LikeBtn";
import StarRating from "../Cards/Stars/Stars";

interface Props {
  book: Book;
  user?: User;
  setWarningMsg: (msg: string) => void;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const BookInfoBox: React.FC<Props> = ({
  book,
  user,
  setWarningMsg,
  isLoggedin,
  setIsLoggedin,
  setBooks,
  setUser,
}) => {
  const { theme } = useTheme();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center min-w-[300px] opacity-80 flex">
        <div className="left">
          <img src={BASE_URL + book.cover?.url} alt="cover" />
          <div className="text-gray-500 text-lg flex items-center">
            <StarRating
              book={book}
              user={user}
              userRatings={user?.ratings ?? []}
              setWarningMsg={setWarningMsg}
              isLoggedin={isLoggedin}
              setIsLoggedin={setIsLoggedin}
              setBooks={setBooks}
              setUser={setUser}
            />
          </div>
        </div>
        <div className="right flex flex-col gap-[4px]">
          <h2 className="text-white text-m text-left pr-[15px] ">
            {book.title}
          </h2>
          <h3 className="text-m font-semibold mb-4">{book.author}</h3>
          <p className="text-gray-500 text-left text-sm line-clamp-20">
            {book.description}
          </p>
          <p>Pages: {book.pages}</p>
          <div className="buttonContainer flex justify-center items-center w-full gap-[10px]">
            {theme === "sale" ? (
              <div className="flex flex-col">
                <p className="text-white text-l">
                  ${(book.price * 0.9).toFixed(2)}
                </p>
                <p className="text-red-600 line-through text-m opacity-70">
                  ${book.price}
                </p>
              </div>
            ) : (
              <p className="text-white text-m">${book.price}</p>
            )}
            <div className="w-full bg-[#35353f] p-[2px] rounded-full box-border">
              <div className="bg-[#22222e] rounded-full w-full h-full hover:cursor-pointer">
                <button
                  className="text-white bg-[#35353f] w-[calc(100%-4px)] py-[10px] rounded-full m-[2px] text-sm hover:cursor-pointer hover:bg-[#5c5c6b]"
                  id="addToCart"
                >
                  Add to cart
                </button>
              </div>
            </div>
            <LikeBtn
              user={user}
              book={book}
              isLoggedin={isLoggedin}
              setWarningMsg={setWarningMsg}
              setBooks={setBooks}
              setUser={setUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoBox;

import { useEffect, useRef } from "react";
import { BASE_URL } from "../../config/api";
import { useTheme } from "../../contexts/ThemeContext";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import LikeBtn from "../Cards/LikeBtn/LikeBtn";
import StarRating from "../Cards/Stars/Stars";
import { useBookInfo } from "../../contexts/bookInfoContext";

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
  const boxRef = useRef<HTMLDivElement>(null);
  const { setBookInfoBox } = useBookInfo();
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setBookInfoBox(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-0.5 bg-black/50">
      {/* <div className="bg-[#eeebe8] p-6 rounded-lg shadow-lg text-center min-w-[300px] max-w-[1000px] flex mx-[40px]"> */}
      <div className="bg-[#f5f0f9] p-6 rounded-lg shadow-lg text-center min-w-[300px] max-w-[1000px] flex mx-[40px]">
        <div className="left">
          <img
            src={BASE_URL + book.cover?.url}
            alt="cover"
            className="max-w-[290px]"
          />
        </div>
        <div className="right flex flex-col justify-between gap-[4px] px-[40px] pb-[43px]">
          <div className="top flex flex-col gap-[15px]">
            <div className="title flex flex-col gap-[5px]">
              <h2 className="text-4xl font-bold text-left pr-[15px] ">
                {book.title}
              </h2>
              <h3 className="text-3xl text-left  font-semibold mb-4">
                {book.author}
              </h3>
              <div className="info text-gray-500 w-full text-lg flex justify-between items-end pt-[15px]">
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
                <p className="text-sm">Pages: {book.pages}</p>
              </div>
            </div>

            <p className="text-gray-500 text-left text-sm line-clamp-20">
              {book.description}
            </p>
          </div>
          <div className="buttonContainer pr-[40px] flex justify-center items-center w-full gap-[10px]">
            {theme === "sale" ? (
              <div className="flex flex-col">
                <p className="text-white text-xl">
                  ${(book.price * 0.9).toFixed(2)}
                </p>
                <p className="text-red-600 line-through text-l opacity-70">
                  ${book.price}
                </p>
              </div>
            ) : (
              <p className="text-xl pr-[40px]">Price ${book.price}</p>
            )}
            <button
              className="text-white  my-button hoverColor w-[300px] py-[12px] rounded-lg m-[2px] text-sm hover:cursor-pointer hover:bg-[#5c5c6b]"
              id="addToCart"
            >
              Add to cart
            </button>
            <LikeBtn
              user={user}
              book={book}
              isLoggedin={isLoggedin}
              setWarningMsg={setWarningMsg}
              setBooks={setBooks}
              setUser={setUser}
              classes={"my-button hoverColor"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoBox;

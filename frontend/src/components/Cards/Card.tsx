import { useState } from "react";
import { mediaUrl } from "../../config/api";
import { useBookInfo } from "../../contexts/bookInfoContext";
import { useCart } from "../../contexts/cartContext";
import { useTheme } from "../../contexts/ThemeContext";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import LikeBtn from "./LikeBtn/LikeBtn";
import StarRating from "./Stars/Stars";

interface Props {
  book: Book;
  user?: User | null;
  setWarningMsg: (msg: string) => void;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Card: React.FC<Props> = ({
  book,
  user,
  setWarningMsg,
  isLoggedin,
  setIsLoggedin,
  setBooks,
  setUser,
}) => {
  const { theme } = useTheme();
  const { setBookInfoId } = useBookInfo();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <a
      id="card"
      className="w-[270px] h-[456px] flex-shrink-0 bg-contain bg-no-repeat bg-top flex flex-col justify-end shadow-2xl rounded-t-3xl rounded-b-3xl duration-400 hover:scale-105 "
      style={{
        backgroundImage: `url(${mediaUrl(book.cover?.url)})`,
      }}
      onClick={() => setBookInfoId(book.documentId)}
    >
      <div className="bottom h-[205px] bg-[#22222e] flex flex-col justify-between px-[20px] py-[15px] gap-[5px] rounded-br-xl rounded-bl-xl rounded-tr-[80px]">
        <div className="flex flex-col h-100 justify-between gap-[4px]">
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-white text-m text-left pr-[15px] ">
              {book.title}
            </h2>
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
          <p className="text-gray-500 text-left text-sm line-clamp-2">
            {book.description}
          </p>
        </div>
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
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(book);
                  setAdded(true);
                  window.setTimeout(() => setAdded(false), 1200);
                }}
              >
                {added ? "Added ✓" : "Add to cart"}
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
    </a>
  );
};

export default Card;

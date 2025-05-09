import { BASE_URL } from "../../config/api";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import LikeBtn from "./LikeBtn/LikeBtn";
import StarRating from "./Stars/Stars";

interface Props {
  book: Book;
  user?: User;
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
  return (
    <div
      id="card"
      className="w-[270px] h-[456px] flex-shrink-0 bg-contain bg-no-repeat bg-top flex flex-col justify-end shadow-2xl rounded-t-3xl rounded-b-3xl duration-400 hover:scale-105 "
      style={{
        backgroundImage: `url(${BASE_URL + book.cover?.url})`,
      }}
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
          <p className="text-white text-m">${book.price}</p>
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
  );
};

export default Card;

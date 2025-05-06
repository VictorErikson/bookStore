import { BASE_URL } from "../../config/api";
import type { Book } from "../../types/book";
import type { User } from "../../types/user";
import LikeBtn from "./LikeBtn/LikeBtn";
import StarRating from "./Stars/Stars";

interface Props {
  book: Book;
  user?: User;
}

const Card: React.FC<Props> = ({ book, user }) => {
  console.log(book.cover.url);

  return (
    <div
      id="card"
      className="w-[270px] h-[456px]  flex-shrink-0 bg-contain bg-no-repeat bg-top flex flex-col justify-end shadow-2xl rounded-t-3xl rounded-b-3xl duration-400 hover:scale-105 "
      style={{
        backgroundImage: `url(${BASE_URL + book.cover.url})`,
        // backgroundPosition: "center -200%",
      }}
    >
      <div className="bottom h-[205px] bg-[#22222e] flex flex-col justify-between px-[20px] py-[15px] gap-[5px] rounded-br-xl rounded-bl-xl rounded-tr-[80px]">
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-white text-m text-left h-[48px] pr-[15px] ">
            {book.title}
          </h2>
          <StarRating values={book.ratings} userRatings={user?.ratings ?? []} />
          <p className="text-gray-500 text-left text-sm line-clamp-2">
            {book.description}
          </p>
        </div>
        <div className="buttonContainer flex justify-center items-center w-full gap-[15px]">
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
          <LikeBtn starred={user?.starred ?? []} bookId={book.documentId} />
        </div>
      </div>
    </div>
  );
  // return (
  //   <div
  //     id="card"
  //     // className=" w-[340px] flex-shrink-0 bg-[#efedee] flex flex-col items-center justify-between shadow-2xl rounded-t-3xl rounded-b-3xl"
  //     className=" w-[340px] h-[600px] flex-shrink-0 bg-[url('/path/to/image.jpg')] bg-cover bg-center flex flex-col items-center justify-between shadow-2xl rounded-t-3xl rounded-b-3xl"
  //   >
  //     {/* <div className="top h-half">
  //       <img
  //         // className="h-[300px] p-[20px] box-border"
  //         className="w-100 box-border rounded-t-xl"
  //         src={BASE_URL + book.cover.url}
  //         alt={book.title}
  //       />
  //     </div> */}
  //     <div className="bottom h-[255px] bg-[#22222e] flex flex-col justify-between p-[20px] gap-[15px] rounded-br-xl rounded-bl-xl rounded-tr-[80px]">
  //       <div className="flex flex-col gap-[10px]">
  //         <h2 className="text-white text-lg text-left pt-[10px] pr-[15px] ">
  //           {book.title}
  //         </h2>
  //         {/* <StarRating value={book.ratings} starred={user?.starred ?? []} /> */}
  //         <p className="text-gray-500 text-left">{book.description}</p>
  //       </div>
  //       <div className="buttonContainer flex justify-center items-center w-full gap-[15px]">
  //         <p className="text-white text-lg">${book.price}</p>
  //         <div className="w-full bg-[#35353f] p-[2px] rounded-full box-border">
  //           <div className="bg-[#22222e] rounded-full w-full h-full">
  //             <button
  //               className="text-white bg-[#35353f] w-[calc(100%-4px)] py-[10px] rounded-full m-[2px]"
  //               id="addToCart"
  //             >
  //               Add to cart
  //             </button>
  //           </div>
  //         </div>
  //         <LikeBtn starred={user?.starred ?? []} bookId={book.documentId} />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Card;

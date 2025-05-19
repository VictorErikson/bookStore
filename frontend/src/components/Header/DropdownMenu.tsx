import type { RefObject } from "react";

interface Props {
  allBooksRef: RefObject<HTMLElement> | null;
  favouritesRef: RefObject<HTMLElement>;
  ratedRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DropdownMenu: React.FC<Props> = ({
  allBooksRef,
  favouritesRef,
  ratedRef,
  reviewsRef,
  setIsOpen,
}) => {
  return (
    <div
      className="absolute right-[-100px] mt-2 rounded shadow-md z-10 bg-[rgba(32,16,48,0.95)] p-[10px] text-white font-bold text-2xl
    "
    >
      <ul>
        <li className="px-4 py-2 hover:text-[#d7355b] cursor-pointer">
          <button
            onClick={() => {
              allBooksRef?.current?.scrollIntoView({ behavior: "smooth" });
              setIsOpen(false);
            }}
          >
            Books
          </button>
        </li>
        <li className="px-4 py-2 hover:text-[#d7355b] cursor-pointer">
          <button
            onClick={() => {
              favouritesRef?.current?.scrollIntoView({ behavior: "smooth" });
              setIsOpen(false);
            }}
          >
            Favourites
          </button>
        </li>
        <li className="px-4 py-2 hover:text-[#d7355b] cursor-pointer">
          <button
            onClick={() => {
              ratedRef.current?.scrollIntoView({ behavior: "smooth" });
              setIsOpen(false);
            }}
          >
            Ratings
          </button>
        </li>
        <li className="px-4 py-2 hover:text-[#d7355b] cursor-pointer">
          <button
            onClick={() => {
              reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
              setIsOpen(false);
            }}
          >
            Reviews
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;

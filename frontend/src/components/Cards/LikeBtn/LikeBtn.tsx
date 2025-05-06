import { useState } from "react";
import type { StarredBook } from "../../../types/user";
import IconHeart from "../../logos/IconHeart";
import IconHeartFilled from "../../logos/IconHeartFilled";

interface Props {
  starred: StarredBook[];
  bookId: string;
}

const LikeBtn: React.FC<Props> = ({ starred, bookId }) => {
  const isStarred = starred.some((item) => item.documentId === bookId);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=" w-[53px] w-[53px] flex-shrink-0 bg-[#35353f] p-[2px] rounded-full box-border flex items-center justify-center hover:cursor-pointer ">
      <div
        className="bg-[#22222e] rounded-full w-full h-full flex items-center justify-center hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="button bg-[#35353f] w-[calc(100%-4px)] py-[10px] rounded-full m-[2px] flex items-center justify-center hover:cursor-pointer hover:bg-[#5c5c6b]"
          id="like"
          aria-label="Like"
        >
          {isStarred ? (
            <IconHeartFilled />
          ) : isHovered ? (
            <IconHeartFilled color="#FFFFFF" />
          ) : (
            <IconHeart />
          )}
          {/* {isStarred ? <IconHeartFilled /> : <IconHeart />} */}
        </button>
      </div>
    </div>
  );
};

export default LikeBtn;

import { useEffect, useState } from "react";
import type { User } from "../../../types/user";
import IconHeart from "../../logos/IconHeart";
import IconHeartFilled from "../../logos/IconHeartFilled";
import updateBook from "../../../services/updateBook";
import type { Book, LikedUser } from "../../../types/book";
import checkLoginStatus from "../../../services/checkLoginStatus";
import { useAnonData } from "../../../contexts/anonDataContext";

interface Props {
  user?: User | null;
  book: Book;
  isLoggedin: boolean;
  setWarningMsg: (msg: string) => void;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  classes?: string;
}

const LikeBtn: React.FC<Props> = ({
  user,
  book,
  isLoggedin,
  setBooks,
  setUser,
  classes,
}) => {
  const { anonLikes, toggleAnonLike } = useAnonData();
  const likedNow = isLoggedin
    ? user?.starred.some((item) => item.documentId === book.documentId) ??
      false
    : anonLikes.includes(book.documentId);
  const [isLiked, setIsLiked] = useState(likedNow);
  useEffect(() => {
    setIsLiked(likedNow);
  }, [likedNow]);
  const [isHovered, setIsHovered] = useState(false);

  const toggleLike = async (book: Book) => {
    const toggleUserInLiked = (
      likedUsers: LikedUser[] = [],
      user?: User
    ): LikedUser[] => {
      const isAlreadyLiked = likedUsers.some(
        (u) => u.documentId === user?.documentId
      );

      setIsLiked(!isAlreadyLiked);

      if (isAlreadyLiked) {
        return likedUsers.filter((u) => u.documentId !== user?.documentId);
      } else {
        return [...likedUsers, user as LikedUser];
      }
    };

    const updatedLikes = toggleUserInLiked(book.liked, user ?? undefined);

    await updateBook(
      book.documentId,
      updatedLikes.map((u) => u.documentId)
    );

    setBooks((prev) =>
      prev.map((b) =>
        b.documentId === book.documentId ? { ...b, liked: updatedLikes } : b
      )
    );
    const responseUser = await checkLoginStatus();
    setUser(responseUser);
  };

  return (
    <div
      className={`w-[53px] w-[53px] flex-shrink-0 bg-[#35353f] p-[2px] rounded-full box-border flex items-center justify-center hover:cursor-pointer ${classes}`}
    >
      <div
        className={`bg-[#22222e] rounded-full w-full h-full flex items-center justify-center hover:cursor-pointer ${classes}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onMouseDown={(e) => e.stopPropagation()}
          className={`button bg-[#35353f] w-[calc(100%-4px)] py-[10px] rounded-full m-[2px] flex items-center justify-center hover:cursor-pointer hover:bg-[#5c5c6b] ${classes}`}
          id="like"
          aria-label="Like"
          onClick={(e) => {
            e.stopPropagation();
            if (isLoggedin) {
              toggleLike(book);
            } else {
              toggleAnonLike(book.documentId);
            }
          }}
        >
          {isLiked ? (
            <IconHeartFilled />
          ) : isHovered ? (
            <IconHeartFilled color="#FFFFFF" />
          ) : (
            <IconHeart />
          )}
        </button>
      </div>
    </div>
  );
};

export default LikeBtn;

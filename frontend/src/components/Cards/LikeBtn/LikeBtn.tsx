import { useRef, useState } from "react";
import type { StarredBook, User } from "../../../types/user";
import IconHeart from "../../logos/IconHeart";
import IconHeartFilled from "../../logos/IconHeartFilled";
import updateBook from "../../../services/updateBook";
import type { Book, LikedUser } from "../../../types/book";
import { useAnonData } from "../../../contexts/anonDataContext";
import { useToast } from "../../../contexts/toastContext";

interface Props {
  user?: User | null;
  book: Book;
  isLoggedin: boolean;
  setWarningMsg: (msg: string) => void;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  classes?: string;
}

const toStarredBook = (book: Book): StarredBook => ({
  id: book.id,
  documentId: book.documentId,
  title: book.title,
  author: book.author,
  pages: book.pages,
  releasedate: book.releasedate,
  createdAt: book.createdAt,
  updatedAt: book.updatedAt,
  publishedAt: book.publishedAt ?? "",
  description: book.description,
  price: book.price,
  cover: book.cover,
});

const LikeBtn: React.FC<Props> = ({
  user,
  book,
  isLoggedin,
  setBooks,
  setUser,
  classes,
}) => {
  const { anonLikes, toggleAnonLike } = useAnonData();
  const { showToast } = useToast();
  const pendingRef = useRef(false);
  const likedNow = isLoggedin
    ? user?.starred.some((item) => item.documentId === book.documentId) ??
      false
    : anonLikes.includes(book.documentId);
  const [isHovered, setIsHovered] = useState(false);

  const toggleLike = async (book: Book) => {
    if (pendingRef.current || !user) return;
    pendingRef.current = true;

    const originalLikes = book.liked ?? [];
    const isAlreadyLiked = originalLikes.some(
      (u) => u.documentId === user.documentId
    );
    const updatedLikes = isAlreadyLiked
      ? originalLikes.filter((u) => u.documentId !== user.documentId)
      : [...originalLikes, user as LikedUser];

    setBooks((prev) =>
      prev.map((b) =>
        b.documentId === book.documentId ? { ...b, liked: updatedLikes } : b
      )
    );
    setUser((prev) => {
      if (!prev) return prev;
      return isAlreadyLiked
        ? {
            ...prev,
            starred: prev.starred.filter(
              (s) => s.documentId !== book.documentId
            ),
          }
        : { ...prev, starred: [...prev.starred, toStarredBook(book)] };
    });

    try {
      await updateBook(
        book.documentId,
        updatedLikes.map((u) => u.documentId)
      );
    } catch {
      setBooks((prev) =>
        prev.map((b) =>
          b.documentId === book.documentId ? { ...b, liked: originalLikes } : b
        )
      );
      setUser((prev) => {
        if (!prev) return prev;
        return isAlreadyLiked
          ? { ...prev, starred: [...prev.starred, toStarredBook(book)] }
          : {
              ...prev,
              starred: prev.starred.filter(
                (s) => s.documentId !== book.documentId
              ),
            };
      });
      showToast("Couldn't update your favourites, please try again.");
    } finally {
      pendingRef.current = false;
    }
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
          {likedNow ? (
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

import axios from "axios";
import { BASE_URL } from "../config/api";
import type { User, UserRating } from "../types/user";
import type { Book } from "../types/book";

const rateBook = async <T,>(
  score: number,
  rating: UserRating | null,
  userHasRated: boolean,
  user: User,
  book: Book,
  refreshBook: () => Promise<void>
): Promise<T> => {
  const postData = {
    data: {
      rating: score + 1,
      book: book.documentId,
      users_permissions_user: user.documentId,
    },
  };
  const updateData = {
    data: {
      rating: score + 1,
    },
  };

  if (userHasRated && rating) {
    try {
      const response = await axios.put<T>(
        `${BASE_URL}/api/ratings/${rating.documentId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      await refreshBook();
      return response.data;
    } catch (error) {
      console.error("Error updating rating:", error);
      return Promise.reject(error);
    }
  } else {
    try {
      const response = await axios.post<T>(
        `${BASE_URL}/api/ratings?populate=*`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      await refreshBook();
      return response.data;
    } catch (error) {
      console.error("Error updating rating:", error);
      return Promise.reject(error);
    }
  }
};

export default rateBook;

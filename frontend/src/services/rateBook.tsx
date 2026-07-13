import axios from "axios";
import { BASE_URL } from "../config/api";
import type { User, UserRating } from "../types/user";
import type { Book } from "../types/book";

export interface RatingResponse {
  data: {
    id: number;
    documentId: string;
    rating: number;
  };
}

const buildHeaders = () => {
  const token = sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const rateBook = async (
  score: number,
  rating: UserRating | null,
  userHasRated: boolean,
  user: User | null | undefined,
  book: Book,
  anonRatingDocumentId?: string
): Promise<RatingResponse> => {
  const headers = buildHeaders();
  const value = score + 1;
  const existingId =
    userHasRated && rating ? rating.documentId : anonRatingDocumentId;

  try {
    if (existingId) {
      const response = await axios.put<RatingResponse>(
        `${BASE_URL}/api/ratings/${existingId}?populate=*`,
        { data: { rating: value } },
        { headers, timeout: 15000 }
      );
      return response.data;
    }

    const postData = {
      data: {
        rating: value,
        book: book.documentId,
        ...(user ? { users_permissions_user: user.documentId } : {}),
      },
    };
    const response = await axios.post<RatingResponse>(
      `${BASE_URL}/api/ratings?populate=*`,
      postData,
      { headers, timeout: 15000 }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating rating:", error);
    return Promise.reject(error);
  }
};

export default rateBook;

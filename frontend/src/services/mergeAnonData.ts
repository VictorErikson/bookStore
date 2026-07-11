import axios from "axios";
import { BASE_URL } from "../config/api";
import type { User } from "../types/user";
import type { Book } from "../types/book";
import type { AnonRating } from "../contexts/anonDataContext";
import fetchData from "./fetchData";
import updateBook from "./updateBook";

const mergeAnonData = async (
  user: User,
  anonLikes: string[],
  anonRatings: Record<string, AnonRating>
) => {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };

  for (const [bookId, anon] of Object.entries(anonRatings)) {
    try {
      const existing = user.ratings.find(
        (r) => r.book?.documentId === bookId
      );
      if (existing) {
        await axios.put(
          `${BASE_URL}/api/ratings/${existing.documentId}`,
          { data: { rating: anon.value } },
          { headers }
        );
      } else if (anon.ratingDocumentId) {
        await axios.put(
          `${BASE_URL}/api/ratings/${anon.ratingDocumentId}`,
          { data: { users_permissions_user: user.documentId } },
          { headers }
        );
      } else {
        await axios.post(
          `${BASE_URL}/api/ratings`,
          {
            data: {
              rating: anon.value,
              book: bookId,
              users_permissions_user: user.documentId,
            },
          },
          { headers }
        );
      }
    } catch (error) {
      console.error("Failed to merge rating for book", bookId, error);
    }
  }

  for (const bookId of anonLikes) {
    try {
      if (user.starred.some((b) => b.documentId === bookId)) continue;
      const response = await fetchData<{ data: Book }>(
        `${BASE_URL}/api/books/${bookId}?populate=*`
      );
      const likedIds = (response.data.liked ?? []).map((u) => u.documentId);
      if (!likedIds.includes(user.documentId)) {
        await updateBook(bookId, [...likedIds, user.documentId]);
      }
    } catch (error) {
      console.error("Failed to merge like for book", bookId, error);
    }
  }
};

export default mergeAnonData;

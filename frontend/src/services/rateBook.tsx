import axios from "axios";
import { BASE_URL } from "../config/api";

const rateBook = async <T,>(score: number, bookId: string): Promise<T> => {
  const postData = {
    data: {
      ratings: score,
    },
  };

  try {
    const response = await axios.put<T>(
      `${BASE_URL}/api/books/${bookId}?populate=*`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating rating:", error);
    return Promise.reject(error);
  }
};

export default rateBook;

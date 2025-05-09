import axios from "axios";
import { BASE_URL } from "../config/api";

const updateBook = async <T,>(bookId: string, likedArray: string[]) => {
  const updateData = {
    data: {
      liked: likedArray,
    },
  };

  try {
    const response = await axios.put<T>(
      `${BASE_URL}/api/books/${bookId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    return Promise.reject(error);
  }
};

export default updateBook;

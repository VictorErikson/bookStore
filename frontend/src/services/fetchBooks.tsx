import { BASE_URL } from "../config/api";
import type { Book } from "../types/book";
import fetchData from "./fetchData";

const fetchBooks = async () => {
  const response = await fetchData<{ data: Book[] }>(
    BASE_URL + `/api/books?populate=*`
  );
  return response.data;
};

export default fetchBooks;

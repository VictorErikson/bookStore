import { BASE_URL } from "../config/api";
import type { Book } from "../types/book";
import fetchData, { fetchWithRetry } from "./fetchData";

interface FetchBooksOptions {
  retry?: boolean;
  signal?: AbortSignal;
}

const fetchBooks = async (options?: FetchBooksOptions) => {
  const url = BASE_URL + `/api/books?populate=*`;
  const response = options?.retry
    ? await fetchWithRetry<{ data: Book[] }>(url, options.signal)
    : await fetchData<{ data: Book[] }>(url, options?.signal);
  return response.data;
};

export default fetchBooks;

import type { Book, Cover } from "./book";

export interface UserRating {
    id: number;
    documentId: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    book: Book | null
  }
  
  export interface StarredBook {
    id: number;
    documentId: string;
    title: string;
    author: string;
    pages: number;
    releasedate: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description: string;
    price: number;
    cover?: Cover;
  }
  
  export interface User {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    ratings: UserRating[];
    starred: StarredBook[];
  }
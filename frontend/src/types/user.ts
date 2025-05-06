export interface UserRating {
    id: number;
    documentId: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
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
    publishedAt: string | null;
    description: string;
    price: number;
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
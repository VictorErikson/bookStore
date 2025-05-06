export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface Rating {
  id: number;
  documentId: string;
  rating: RatingValue;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Cover {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Book {
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
  cover: Cover;
  ratings: Rating[];
}



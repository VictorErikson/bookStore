import { useEffect, useState } from "react";
import { BASE_URL } from "../../config/api";
import fetchData from "../../services/fetchData";
import type { Cover } from "../../types/book";

const BookCarousel = () => {
  const [images, setImages] = useState<Cover[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchData<Cover[]>(BASE_URL + `/api/upload/files`);
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="flex gap-[25px]">
      {images.map((img) => (
        <div className="w-[175px] h-[175px] overflow-hidden flex items-center justify-center ">
          <img
            key={img.documentId}
            src={BASE_URL + img.url}
            alt={`Book cover ${img.name}`}
            className="w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default BookCarousel;

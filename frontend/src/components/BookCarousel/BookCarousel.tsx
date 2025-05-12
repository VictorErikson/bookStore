import { useEffect, useState } from "react";
import { BASE_URL } from "../../config/api";
import type { Cover } from "../../types/book";
import axios from "axios";

const BookCarousel = () => {
  const [carousel1Images, setCarousel1Images] = useState<Cover[]>([]);
  const [carousel2Images, setCarousel2Images] = useState<Cover[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await axios.get<Cover[]>(
          BASE_URL + `/api/upload/files?populate=*`
        );
        setCarousel1Images(
          response.data.filter((file) => file.name.includes("carousel1"))
        );
        setCarousel2Images(
          response.data.filter((file) => file.name.includes("carousel2"))
        );
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    loadImages();
  }, []);

  const N = carousel1Images.length; // e.g. 10
  const N2 = carousel2Images.length; // e.g. 10
  const G = 12; // gap in px
  const W = "7%"; // each img’s width

  const pool = [...carousel1Images, ...carousel1Images];
  const pool2 = [...carousel2Images, ...carousel2Images];
  const blockShift = `calc((${W} + ${G}px) * ${N})`;
  const trackWidth = `calc((${W} + ${G}px) * ${N * 2})`;
  const blockShift2 = `calc((${W} + ${G}px) * ${N2})`;
  const trackWidth2 = `calc((${W} + ${G}px) * ${N2 * 2})`;

  //   const gapTotal = (N - 1) * 10;

  return (
    <div className="overflow-hidden w-full flex flex-col gap-[15px] pt-[80px] pb-[80px]">
      <div
        className="flex animate-scroll pointer-events-none"
        style={
          {
            width: trackWidth,
            gap: `${G}px`,
            // expose to CSS:
            "--block-shift": blockShift,
          } as React.CSSProperties
        }
      >
        {pool.map((img, i) => (
          <div key={i} className="flex-none" style={{ width: W }}>
            <img
              src={BASE_URL + img.url}
              alt={img.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div
        className="flex animate-scroll-right pointer-events-none"
        style={
          {
            width: trackWidth2,
            gap: `${G}px`,
            // expose to CSS:
            "--block-shift": blockShift2,
          } as React.CSSProperties
        }
      >
        {pool2.map((img, i) => (
          <div key={i} className="flex-none" style={{ width: W }}>
            <img
              src={BASE_URL + img.url}
              alt={img.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCarousel;

{
  /* <div className="overflow-hidden w-full">
      <div
        className="flex animate-scroll pointer-events-none"
        style={{ width: "285.714%" }}
      >
        {pool.map((img, i) => (
          <div key={i} className="flex-none" style={{ width: "14.2857%" }}>
            <img
              src={BASE_URL + img.url}
              alt={img.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div> */
}

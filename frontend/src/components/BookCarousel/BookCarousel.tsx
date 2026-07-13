import { useEffect, useState } from "react";
import { BASE_URL, mediaUrl } from "../../config/api";
import type { Cover } from "../../types/book";
import { fetchWithRetry } from "../../services/fetchData";

const BookCarousel = () => {
  const [carousel1Images, setCarousel1Images] = useState<Cover[]>([]);
  const [carousel2Images, setCarousel2Images] = useState<Cover[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadImages = async () => {
      try {
        const files = await fetchWithRetry<Cover[]>(
          BASE_URL + `/api/upload/files?populate=*`,
          controller.signal
        );
        setCarousel1Images(
          files.filter((file) => file.name.includes("carousel1"))
        );
        setCarousel2Images(
          files.filter((file) => file.name.includes("carousel2"))
        );
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        if (!controller.signal.aborted) setImagesLoading(false);
      }
    };

    loadImages();
    return () => controller.abort();
  }, []);

  const N = carousel1Images.length;
  const N2 = carousel2Images.length;
  const G = 12;
  const W = "7%";

  if (N === 0 && N2 === 0) {
    if (!imagesLoading) return null;
    return (
      <div className="overflow-hidden w-full flex flex-col gap-[15px] pt-[80px] pb-[80px]">
        <div className="h-[110px] mx-[16px] rounded bg-[#35353f]/40 animate-pulse" />
        <div className="h-[110px] mx-[16px] rounded bg-[#35353f]/40 animate-pulse" />
      </div>
    );
  }

  const pool = [...carousel1Images, ...carousel1Images];
  const pool2 = [...carousel2Images, ...carousel2Images];
  const blockShift = `calc((${W} + ${G}px) * ${N})`;
  const trackWidth = `calc((${W} + ${G}px) * ${N * 2})`;
  const blockShift2 = `calc((${W} + ${G}px) * ${N2})`;
  const trackWidth2 = `calc((${W} + ${G}px) * ${N2 * 2})`;


  return (
    <div className="overflow-hidden w-full flex flex-col gap-[15px] pt-[80px] pb-[80px]">
      <div
        className="flex animate-scroll pointer-events-none"
        style={
          {
            width: `max(${trackWidth}, 1500px)`,
            gap: `${G}px`,
            "--block-shift": blockShift,
          } as React.CSSProperties
        }
      >
        {pool.map((img, i) => (
          <div key={i} className="flex-none" style={{ width: W }}>
            <img
              src={mediaUrl(img.url)}
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
            width: `max(${trackWidth2}, 1500px)`,
            gap: `${G}px`,
            "--block-shift": blockShift2,
          } as React.CSSProperties
        }
      >
        {pool2.map((img, i) => (
          <div key={i} className="flex-none" style={{ width: W }}>
            <img
              src={mediaUrl(img.url)}
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

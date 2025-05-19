import { useEffect, useState } from "react";
import InspoCard from "./InspoCard";
import Circle from "./Circle";

const InspoPart = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-screen flex flex-col items-center pb-[120px]">
      <h2 className="pb-[80px] text-4xl text-white font-bold">
        You + us = A more delightful everyday life
      </h2>
      <div className="flex justify-start gap-[45px] ">
        <InspoCard
          img={"/public/assets/inspo/cooking.jpeg"}
          imgPlacement={"bg-right"}
          title={"Turn up the flavor"}
          text={
            "Follow delicious recipes as you cook, making every meal an inspired creation."
          }
        />
        <div className="relative">
          <InspoCard
            img={"/public/assets/inspo/bed.jpg"}
            title={"Bedtime Bliss"}
            imgPlacement={"bg-center"}
            text={
              "Unwind and escape with a good book in bed, the coziest way to end your day."
            }
          />
          <Circle />
        </div>
        {windowWidth > 1250 && (
          <InspoCard
            img={"/public/assets/inspo/outdoor.jpg"}
            title={"Outdoor Adventures"}
            imgPlacement={"bg-[position:25%_center]"}
            text={"Let your child's imagination roam free."}
          />
        )}

        {windowWidth > 1620 && (
          <InspoCard
            img={"/public/assets/inspo/deepdive.avif"}
            title={"Deepdive"}
            imgPlacement={"bg-center"}
            text={
              "Learn everything, and then some, about your favorite subject."
            }
          />
        )}
      </div>
    </div>
  );
};

export default InspoPart;

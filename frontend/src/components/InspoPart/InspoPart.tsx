import InspoCard from "./InspoCard";
import Circle from "./Circle";

const InspoPart = () => {
  return (
    <div className="w-full flex flex-col items-center pb-[70px] lg:pb-[120px] px-6">
      <h2 className="pb-[40px] lg:pb-[80px] text-2xl md:text-4xl text-white font-bold text-center">
        You + us = A more delightful everyday life
      </h2>
      {/* Column count and card visibility change together at each breakpoint so
          there is never a single card left alone on a row:
          phone = 1 col / 2 cards, md = 2 col / 4 cards (2+2),
          lg = 3 col / 3 cards (4th hidden), 2xl = 4 col / 4 cards. */}
      <div
        className="grid w-full justify-center gap-[20px] md:gap-[45px]
          grid-cols-[repeat(1,minmax(0,345px))]
          md:grid-cols-[repeat(2,minmax(0,345px))]
          lg:grid-cols-[repeat(3,minmax(0,345px))]
          2xl:grid-cols-[repeat(4,minmax(0,345px))]"
      >
        <InspoCard
          img={`${import.meta.env.BASE_URL}assets/inspo/cooking.jpeg`}
          imgPlacement={"bg-right"}
          title={"Turn up the flavor"}
          text={
            "Follow delicious recipes as you cook, making every meal an inspired creation."
          }
        />
        <div className="relative">
          <InspoCard
            img={`${import.meta.env.BASE_URL}assets/inspo/bed.jpg`}
            title={"Bedtime Bliss"}
            imgPlacement={"bg-center"}
            text={
              "Unwind and escape with a good book in bed, the coziest way to end your day."
            }
          />
          <Circle />
        </div>
        {/* 3rd card: appears from md up */}
        <div className="hidden md:block">
          <InspoCard
            img={`${import.meta.env.BASE_URL}assets/inspo/outdoor.jpg`}
            title={"Outdoor Adventures"}
            imgPlacement={"bg-[position:25%_center]"}
            text={"Let your child's imagination roam free."}
          />
        </div>
        {/* 4th card: shown at md (to make 2+2) and again at 2xl (row of 4),
            but hidden at lg/xl so it is not alone on a second row */}
        <div className="hidden md:block lg:hidden 2xl:block">
          <InspoCard
            img={`${import.meta.env.BASE_URL}assets/inspo/deepdive.avif`}
            title={"Deepdive"}
            imgPlacement={"bg-center"}
            text={
              "Learn everything, and then some, about your favorite subject."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InspoPart;

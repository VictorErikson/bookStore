interface Props {
  onClickScroll?: () => void;
}

const TrendingInfoBox: React.FC<Props> = ({ onClickScroll }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="trendingInfoBox text-white self-center flex flex-col lg:flex-row gap-6 lg:gap-0 px-6 md:px-10 lg:px-[92px] mt-[40px] lg:mt-[60px] w-full max-w-[1311px]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold pr-0 lg:pr-[150px]">
          What's trending!
        </h2>
        <div className="right w-full lg:w-[420px] ">
          <p>
            Curious about what others are reading and what's popular right now?
            Great, this page is an excellent way to discover new books you might
            not have come across otherwise and to find inspiration for your next
            reading experience.
          </p>
          <button
            className="py-[12px] px-[20px] 
my-button hoverColor rounded-lg mt-[40px] hover:cursor-pointer"
            onClick={onClickScroll}
          >
            Hot Right Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingInfoBox;

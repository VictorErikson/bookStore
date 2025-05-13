interface Props {
  onClickScroll?: () => void;
}

const TrendingInfoBox: React.FC<Props> = ({ onClickScroll }) => {
  return (
    <div className="w-screen flex flex-col">
      <div className="trendingInfoBox text-white self-center flex items-between px-[92px] mt-[60px] w-screen max-w-[1311px]">
        <h2 className="text-5xl font-sans font-bold pr-[150px]">
          What's trending!
        </h2>
        <div className="right w-[420px] ">
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

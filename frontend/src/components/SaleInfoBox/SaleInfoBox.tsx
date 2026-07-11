interface Props {
  onClickScroll?: () => void;
}

const SaleInfoBox: React.FC<Props> = ({ onClickScroll }) => {
  return (
    <div className=" w-full flex flex-col">
      <div className="saleInfoBox text-white self-center flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 px-6 md:px-10 lg:px-[92px] w-full max-w-[1311px]">
        <img
          alt="sale"
          className="w-[260px] md:w-[400px] lg:w-[540px] pr-0 lg:pr-[80px]"
          src={`${import.meta.env.BASE_URL}assets/supersale.png`}
        />
        <div className="right w-full lg:w-[420px] ">
          <p>
            For a limited time only, enjoy 10% off every single book in our
            collection, whether you're diving into mysteries, classics, sci-fi,
            or memoirs. Stock up on your next great read and save big at
            BookStore's biggest sale of the year!
          </p>
          <button
            className="py-[12px] px-[20px] 
my-button rounded-lg mt-[40px] hover:cursor-pointer"
            onClick={onClickScroll}
          >
            Hot Right Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleInfoBox;

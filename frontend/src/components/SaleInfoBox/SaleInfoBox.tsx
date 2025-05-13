interface Props {
  onClickScroll?: () => void;
}

const SaleInfoBox: React.FC<Props> = ({ onClickScroll }) => {
  return (
    <div className=" w-screen flex flex-col">
      <div className="saleInfoBox text-white self-center flex items-between items-center justify-center px-[92px] w-screen max-w-[1311px]">
        <img
          alt="sale"
          className="w-[540px] pr-[80px]"
          src="../../../public/assets/supersale.png"
        />
        <div className="right w-[420px] ">
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

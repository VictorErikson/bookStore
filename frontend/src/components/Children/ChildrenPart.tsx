const ChildrenPart = () => {
  return (
    <div className="flex flex-col w-screen">
      <div className="top flex text-white px-[92px] w-screen bg-#100020">
        <img src="" alt="" />
        <div className="info">
          <h2 className="text-xl font-sans font-bold pr-[150px]">
            What's trending!
          </h2>
          <p>
            Curious about what others are reading and what's popular right now?
            Great, this page is an excellent way to discover new books you might
            not have come across otherwise and to find inspiration for your next
            reading experience.
          </p>
          <button
            className="py-[12px] px-[20px] 
my-button rounded-lg mt-[40px] hover:cursor-pointer"
            // onClick={onClickScroll}
          >
            Children Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildrenPart;

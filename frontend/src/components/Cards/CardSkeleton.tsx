const CardSkeleton = () => {
  return (
    <div className="w-[270px] h-[456px] flex-shrink-0 flex flex-col justify-end shadow-2xl rounded-t-3xl rounded-b-3xl animate-pulse">
      <div className="flex-1 bg-[#35353f]/60 rounded-t-3xl" />
      <div className="h-[205px] bg-[#22222e] flex flex-col justify-between px-[20px] py-[15px] rounded-br-xl rounded-bl-xl rounded-tr-[80px]">
        <div className="flex flex-col gap-[10px]">
          <div className="h-[16px] w-3/4 bg-[#35353f] rounded" />
          <div className="h-[16px] w-1/2 bg-[#35353f] rounded" />
          <div className="h-[12px] w-full bg-[#35353f] rounded" />
          <div className="h-[12px] w-5/6 bg-[#35353f] rounded" />
        </div>
        <div className="h-[42px] w-full bg-[#35353f] rounded-full" />
      </div>
    </div>
  );
};

export default CardSkeleton;

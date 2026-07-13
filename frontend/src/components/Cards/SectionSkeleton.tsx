import CardSkeleton from "./CardSkeleton";

const SectionSkeleton = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="flex w-full items-end justify-between pr-[16px] lg:pr-0">
        <h3 className="text-2xl lg:text-3xl text-white pl-[16px] lg:pl-[25px]">
          {title}
        </h3>
      </div>
      <div className="flex gap-[20px] px-[16px] lg:px-[25px] py-[30px] lg:py-[45px] overflow-x-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default SectionSkeleton;

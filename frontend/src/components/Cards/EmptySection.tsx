const EmptySection = ({ title, message }: { title: string; message: string }) => {
  return (
    <div>
      <div className="flex w-full items-end justify-between pr-[16px] lg:pr-0">
        <h3 className="text-2xl lg:text-3xl text-white pl-[16px] lg:pl-[25px]">
          {title}
        </h3>
      </div>
      <p className="text-gray-400 text-left px-[16px] lg:px-[25px] py-[30px] lg:py-[45px]">
        {message}
      </p>
    </div>
  );
};

export default EmptySection;

import IconStarFilled from "../logos/IconStarFilled";

interface Props {
  name: string;
  text: string;
}

const ReviewCard: React.FC<Props> = ({ name, text }) => {
  return (
    <div className="card p-[16px] bg-white w-[250px] h-[140px] rounded-md">
      <div className="flex w-full justify-between items-center mb-[8px]">
        <h2 className="font-bold text-l">{name}</h2>
        <div className="flex">
          <IconStarFilled size={14} />
          <IconStarFilled size={14} />
          <IconStarFilled size={14} />
          <IconStarFilled size={14} />
          <IconStarFilled size={14} />
        </div>
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default ReviewCard;

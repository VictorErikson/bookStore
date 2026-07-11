interface Props {
  img: string;
  title: string;
  text: string;
  imgPlacement: string;
}

const InspoCard: React.FC<Props> = ({ img, title, text, imgPlacement }) => {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className={`bg-cover h-[400px] md:h-[460px] w-full max-w-[345px] rounded-xl text-white flex flex-col justify-end ${imgPlacement}`}
    >
      <div className="flex flex-col gap-[8px] pb-[22px] rounded-xl px-[20px] shadow-[inset_0_-40px_30px_-10px_rgba(0,0,0,0.5)]">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-l font-bold">{text}</p>
      </div>
    </div>
  );
};

export default InspoCard;

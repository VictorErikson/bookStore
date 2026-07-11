import type { SortOptionWithRatings } from "../../types/sorting";

interface Props {
  sortBy: SortOptionWithRatings;
  setSortBy: React.Dispatch<React.SetStateAction<SortOptionWithRatings>>;
  sortRatings?: boolean;
}

const SortingButton: React.FC<Props> = ({
  sortBy,
  setSortBy,
  sortRatings = false,
}) => {
  let sortOptions: SortOptionWithRatings[];

  if (sortRatings) {
    sortOptions = [
      "Title: A-z",
      "Title: Z-a",
      "Author: A-z",
      "Author: Z-a",
      "Price: Low to High",
      "Price: High to Low",
      "My Rating: High to Low",
      "My Rating: Low to High",
    ];
  } else {
    sortOptions = [
      "Title: A-z",
      "Title: Z-a",
      "Author: A-z",
      "Author: Z-a",
      "Price: Low to High",
      "Price: High to Low",
    ];
  }

  const handleClick = () => {
    const currentIndex = sortOptions.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortBy(sortOptions[nextIndex]);
  };

  return (
    <button
      className="text-xl text-white pr-[40px] hover:cursor-pointer opacity-65 hover:opacity-100"
      onClick={handleClick}
    >
      {sortBy}
    </button>
  );
};

export default SortingButton;

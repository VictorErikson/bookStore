import type { SortOption, SortOptionWithRatings } from "../../types/sorting";

interface Props {
  sortBy: SortOption;
  setSortBy: React.Dispatch<React.SetStateAction<SortOption>>;
  sortRatings: boolean;
}

const SortingButton: React.FC<Props> = ({
  sortBy,
  setSortBy,
  sortRatings = false,
}) => {
  let sortOptions: SortOptionWithRatings[] | SortOption | "" = "";

  if (sortRatings) {
    sortOptions = [
      "Title: A-z",
      "Title: Z-a",
      "Author: A-z",
      "Author: Z-a",
      "Price: Low to High",
      "Price: High to Low",
      "My Rating: Low to High",
      "My Rating: High to Low",
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

  return <button onClick={handleClick}>{sortBy}</button>;
};

export default SortingButton;

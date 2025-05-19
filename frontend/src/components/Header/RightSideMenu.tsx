interface Props {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuIsOpen: boolean;
}

const RightSideMenu: React.FC<Props> = ({ setMenuIsOpen, menuIsOpen }) => {
  return (
    <div className="bg-[#201030] w-[300px] absolute right-0 top-0 h-full text-white font-bold text-4xl transparency-95">
      <ul>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Books</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Favourites
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Ratings</li>
      </ul>
    </div>
  );
};

export default RightSideMenu;

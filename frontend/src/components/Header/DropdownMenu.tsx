const DropdownMenu = () => {
  return (
    <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-md z-10">
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

export default DropdownMenu;

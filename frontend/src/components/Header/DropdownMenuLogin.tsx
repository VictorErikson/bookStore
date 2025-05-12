const DropdownMenuLogin = () => {
  return (
    <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-md z-10">
      <ul>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Login</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Create user
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenuLogin;

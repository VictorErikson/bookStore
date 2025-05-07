import { Link } from "react-router-dom";
import { colors } from "../../config/colors";
import IconLogin from "../logos/IconLogin";
import checkLoginStatus from "../../services/checkLoginStatus";

const Header = () => {
  checkLoginStatus();

  return (
    <header className="h-[100px] flex items-center justify-between w-screen px-[45px]">
      <Link to="/">
        <h1 style={{ color: colors.button }} className="text-5xl ">
          BookStore
        </h1>
      </Link>
      <div className="headMenu">
        <button
          onClick={() => login()}
          className="text-white flex gap-[10px] opacity-65 hover:opacity-100 hover:cursor-pointer"
        >
          Login <IconLogin />
        </button>
      </div>
    </header>
  );
};

export default Header;

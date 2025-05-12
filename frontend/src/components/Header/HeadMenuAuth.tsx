import { useState } from "react";
import type { User } from "../../types/user";
import IconLogin from "../logos/IconLogin";
import IconMenu from "../logos/IconMenu";
import DropdownMenu from "./DropdownMenu";

interface MenuProps {
  setLoginMsg: (msg: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadMenuAuth: React.FC<MenuProps> = ({ setUser, setIsLoggedin }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selected, setSelected] = useState("Select an option");

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsLoggedin(false);
  };

  return (
    <div className="headMenu flex gap-[15px] items-center">
      <div className="relative group inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white flex gap-[10px] opacity-65 hover:opacity-100 hover:cursor-pointer"
        >
          <IconMenu size={28} />
        </button>
        {isOpen && <DropdownMenu />}
      </div>
      <div className="h-[28px] border-l border-white opacity-65"></div>
      <button
        onClick={() => logout()}
        className="text-white flex gap-[10px] opacity-65 hover:opacity-100 hover:cursor-pointer"
      >
        Logout <IconLogin />
      </button>
    </div>
  );
};

export default HeadMenuAuth;

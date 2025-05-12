import { useState } from "react";
import type { User } from "../../types/user";
import LoginMenu from "./LoginMenu";
import IconLogin from "../logos/IconLogin";
import DropdownMenuLogin from "./DropdownMenuLogin";
import IconMenu from "../logos/IconMenu";
import CreateUserMenu from "./CreateUserMenu";

interface MenuProps {
  setLoginMsg: (msg: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuStatus: React.Dispatch<React.SetStateAction<string>>;
  menuStatus: string;
}

const HeadMenuUnAuth: React.FC<MenuProps> = ({
  setLoginMsg,
  setUser,
  isLoggedin,
  setIsLoggedin,
  setMenuStatus,
  menuStatus,
}) => {
  if (menuStatus === "start") {
    return (
      <button onClick={() => setMenuStatus("login")}>
        <IconLogin btn={true} size={28} />
      </button>
    );
  }

  if (menuStatus === "login") {
    return (
      <LoginMenu
        setLoginMsg={setLoginMsg}
        setUser={setUser}
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
        setMenuStatus={setMenuStatus}
      />
    );
  }

  if (menuStatus === "createUser") {
    return (
      <CreateUserMenu
        setLoginMsg={setLoginMsg}
        setUser={setUser}
        setIsLoggedin={setIsLoggedin}
        setMenuStatus={setMenuStatus}
      />
    );
  }
};

export default HeadMenuUnAuth;

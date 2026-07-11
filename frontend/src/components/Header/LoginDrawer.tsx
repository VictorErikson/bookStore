import { useState } from "react";
import type { User } from "../../types/user";
import IconMenuOpen from "../logos/IconMenuOpen";
import LoginMenu from "./LoginMenu";
import CreateUserMenu from "./CreateUserMenu";

interface Props {
  loginIsOpen: boolean;
  setLoginIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginMsg: (msg: string | null) => void;
}

const LoginDrawer: React.FC<Props> = ({
  loginIsOpen,
  setLoginIsOpen,
  setUser,
  isLoggedin,
  setIsLoggedin,
  setLoginMsg,
}) => {
  const [menuStatus, setMenuStatus] = useState("login");

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          loginIsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setLoginIsOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 h-full w-[290px] max-w-[85vw] bg-[#201030] text-white z-50 flex flex-col transform transition-transform duration-300 shadow-2xl ${
          loginIsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setLoginIsOpen(false)}
            aria-label="Close login"
            className="opacity-80 hover:opacity-100 hover:cursor-pointer"
          >
            <IconMenuOpen size={30} />
          </button>
        </div>
        <h2 className="text-2xl font-bold px-6 pb-4">
          {menuStatus === "login" ? "Login" : "Create account"}
        </h2>

        <div className="px-6 pb-8 flex flex-col gap-6 overflow-y-auto">
          {menuStatus === "login" ? (
            <LoginMenu
              setLoginMsg={setLoginMsg}
              setUser={setUser}
              isLoggedin={isLoggedin}
              setIsLoggedin={setIsLoggedin}
              setMenuStatus={setMenuStatus}
            />
          ) : (
            <CreateUserMenu
              setLoginMsg={setLoginMsg}
              setUser={setUser}
              setIsLoggedin={setIsLoggedin}
              setMenuStatus={setMenuStatus}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LoginDrawer;

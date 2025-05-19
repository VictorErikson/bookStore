import { useEffect, useRef, useState, type RefObject } from "react";
import type { User } from "../../types/user";
import IconLogin from "../logos/IconLogin";
import IconMenu from "../logos/IconMenu";
import DropdownMenu from "./DropdownMenu";
import IconMenuOpen from "../logos/IconMenuOpen";

interface MenuProps {
  setLoginMsg: (msg: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  allBooksRef: RefObject<HTMLElement> | null;
  favouritesRef: RefObject<HTMLElement>;
  ratedRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
  // setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // menuIsOpen: boolean;
}

const HeadMenuAuth: React.FC<MenuProps> = ({
  setUser,
  setIsLoggedin,
  allBooksRef,
  favouritesRef,
  ratedRef,
  reviewsRef,
  // setMenuIsOpen,
  // menuIsOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const [selected, setSelected] = useState("Select an option");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsLoggedin(false);
  };

  return (
    <div className="headMenu flex gap-[15px] items-center">
      <div className="relative group inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white flex gap-[10px] opacity-65 hover:opacity-100 hover:cursor-pointer"
        >
          {!isOpen ? <IconMenu size={28} /> : <IconMenuOpen size={28} />}
        </button>
        {isOpen && (
          <DropdownMenu
            allBooksRef={allBooksRef}
            favouritesRef={favouritesRef}
            ratedRef={ratedRef}
            reviewsRef={reviewsRef}
            setIsOpen={setIsOpen}
          />
        )}
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

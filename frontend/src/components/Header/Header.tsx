import { Link } from "react-router-dom";
import { colors } from "../../config/colors";
import { useEffect, useState, type RefObject } from "react";
import type { User } from "../../types/user";
import HeadMenuUnAuth from "./HeadMenuUnAuth";
import HeadMenuAuth from "./HeadMenuAuth";
import LoginMsg from "../warningMsgs/LoginMsg";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  // setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // menuIsOpen: boolean;
  allBooksRef: RefObject<HTMLElement> | null;
  favouritesRef: RefObject<HTMLElement>;
  ratedRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
}

const Header: React.FC<Props> = ({
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
  allBooksRef,
  favouritesRef,
  ratedRef,
  reviewsRef,

  // setMenuIsOpen,
  // menuIsOpen,
}) => {
  const [loginMsg, setLoginMsg] = useState<string | null>(null);
  const [menuStatus, setMenuStatus] = useState("start");

  const headerClasses =
    menuStatus === "start"
      ? "flex items-center justify-between w-screen max-w-[1311px] self-center px-[92px] py-[58px]"
      : "flex items-center justify-between w-screen max-w-[1311px] self-center px-[92px] py-[40px]";

  useEffect(() => {
    if (loginMsg) {
      const timeout = setTimeout(() => setLoginMsg(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [loginMsg]);

  return (
    <div className=" w-screen flex flex-col">
      <header className={headerClasses}>
        {loginMsg && <LoginMsg msg={loginMsg} setLoginMsg={setLoginMsg} />}
        <Link to="/">
          <h1
            id="logo"
            style={{ color: colors.button }}
            className="text-5xl font-serif font-bold"
          >
            BookStore
          </h1>
        </Link>
        {user ? (
          <HeadMenuAuth
            setLoginMsg={setLoginMsg}
            setUser={setUser}
            isLoggedin={isLoggedin}
            setIsLoggedin={setIsLoggedin}
            allBooksRef={allBooksRef}
            favouritesRef={favouritesRef}
            ratedRef={ratedRef}
            reviewsRef={reviewsRef}
            // setMenuIsOpen={setMenuIsOpen}
            // menuIsOpen={menuIsOpen}
          />
        ) : (
          <HeadMenuUnAuth
            setLoginMsg={setLoginMsg}
            setUser={setUser}
            isLoggedin={isLoggedin}
            setIsLoggedin={setIsLoggedin}
            setMenuStatus={setMenuStatus}
            menuStatus={menuStatus}
          />
        )}
      </header>
    </div>
  );
};

export default Header;

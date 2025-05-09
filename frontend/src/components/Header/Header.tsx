import { Link } from "react-router-dom";
import { colors } from "../../config/colors";
import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import HeadMenuUnAuth from "./HeadMenuUnAuth";
import HeadMenuAuth from "./HeadMenuAuth";
import LoginMsg from "../warningMsgs/loginMsg";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({
  user,
  setUser,
  isLoggedin,
  setIsLoggedin,
}) => {
  const [loginMsg, setLoginMsg] = useState<string | null>(null);

  useEffect(() => {
    if (loginMsg) {
      const timeout = setTimeout(() => setLoginMsg(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [loginMsg]);

  return (
    <header className="h-[100px] flex items-center justify-between w-screen px-[45px]">
      {loginMsg && <LoginMsg msg={loginMsg} setLoginMsg={setLoginMsg} />}
      <Link to="/">
        <h1 style={{ color: colors.button }} className="text-5xl ">
          BookStore
        </h1>
      </Link>
      {user ? (
        <HeadMenuAuth
          setLoginMsg={setLoginMsg}
          setUser={setUser}
          isLoggedin={isLoggedin}
          setIsLoggedin={setIsLoggedin}
        />
      ) : (
        <HeadMenuUnAuth
          setLoginMsg={setLoginMsg}
          setUser={setUser}
          isLoggedin={isLoggedin}
          setIsLoggedin={setIsLoggedin}
        />
      )}
    </header>
  );
};

export default Header;

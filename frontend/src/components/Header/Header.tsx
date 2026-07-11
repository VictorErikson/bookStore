import { Link } from "react-router-dom";
import { colors } from "../../config/colors";
import { useEffect, useState, type RefObject } from "react";
import type { User } from "../../types/user";
import LoginMsg from "../warningMsgs/LoginMsg";
import IconMenu from "../logos/IconMenu";
import IconCart from "../logos/IconCart";
import IconLogin from "../logos/IconLogin";
import RightSideMenu from "./RightSideMenu";
import LoginDrawer from "./LoginDrawer";
import CartMenu from "../Cart/CartMenu";
import { useCart } from "../../contexts/cartContext";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
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
}) => {
  const [loginMsg, setLoginMsg] = useState<string | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const { totalCount, setCartIsOpen } = useCart();

  useEffect(() => {
    if (loginMsg) {
      const timeout = setTimeout(() => setLoginMsg(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [loginMsg]);

  useEffect(() => {
    if (user) {
      setMenuIsOpen(false);
      setLoginIsOpen(false);
    }
  }, [user]);

  return (
    <div className=" w-full flex flex-col">
      <header className="flex items-center justify-between w-full max-w-[1311px] self-center px-4 py-6 lg:px-[92px] lg:py-[58px]">
        {loginMsg && <LoginMsg msg={loginMsg} setLoginMsg={setLoginMsg} />}
        <Link to="/">
          <h1
            id="logo"
            style={{ color: colors.button }}
            className="text-3xl lg:text-5xl font-serif font-bold"
          >
            BookStore
          </h1>
        </Link>

        <div className="flex items-center gap-[18px]">
          {!user && (
            <button
              className="text-white opacity-80 hover:opacity-100 hover:cursor-pointer"
              onClick={() => setLoginIsOpen(true)}
              aria-label="Open login"
            >
              <IconLogin size={30} />
            </button>
          )}

          <button
            className="relative text-white opacity-80 hover:opacity-100 hover:cursor-pointer"
            onClick={() => setCartIsOpen(true)}
            aria-label="Open cart"
          >
            <IconCart size={30} />
            {totalCount > 0 && (
              <span
                key={totalCount}
                className="cart-pop absolute -top-2 -right-2 bg-[#d7355b] text-white text-xs rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center"
              >
                {totalCount}
              </span>
            )}
          </button>

          <button
            className="text-white opacity-80 hover:opacity-100 hover:cursor-pointer"
            onClick={() => setMenuIsOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu size={34} />
          </button>
        </div>
      </header>

      <CartMenu />
      <LoginDrawer
        loginIsOpen={loginIsOpen}
        setLoginIsOpen={setLoginIsOpen}
        setUser={setUser}
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
        setLoginMsg={setLoginMsg}
      />
      <RightSideMenu
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        user={user}
        setUser={setUser}
        setIsLoggedin={setIsLoggedin}
        allBooksRef={allBooksRef}
        favouritesRef={favouritesRef}
        ratedRef={ratedRef}
        reviewsRef={reviewsRef}
      />
    </div>
  );
};

export default Header;

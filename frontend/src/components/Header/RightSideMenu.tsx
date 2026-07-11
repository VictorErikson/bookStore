import { type RefObject } from "react";
import type { User } from "../../types/user";
import IconMenuOpen from "../logos/IconMenuOpen";

interface Props {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  allBooksRef: RefObject<HTMLDivElement | null> | null;
  favouritesRef: RefObject<HTMLDivElement | null>;
  ratedRef: RefObject<HTMLDivElement | null>;
  reviewsRef: RefObject<HTMLDivElement | null>;
}

const RightSideMenu: React.FC<Props> = ({
  menuIsOpen,
  setMenuIsOpen,
  user,
  setUser,
  setIsLoggedin,
  allBooksRef,
  favouritesRef,
  ratedRef,
  reviewsRef,
}) => {
  const goTo = (ref: RefObject<HTMLDivElement | null> | null) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
    setMenuIsOpen(false);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsLoggedin(false);
    setMenuIsOpen(false);
  };

  const navItems: { label: string; ref: RefObject<HTMLDivElement | null> | null }[] = [
    { label: "Books", ref: allBooksRef },
    { label: "Favourites", ref: favouritesRef },
    { label: "Ratings", ref: ratedRef },
    { label: "Reviews", ref: reviewsRef },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          menuIsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuIsOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 h-full w-[290px] max-w-[85vw] bg-[#201030] text-white z-50 flex flex-col transform transition-transform duration-300 shadow-2xl ${
          menuIsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuIsOpen(false)}
            aria-label="Close menu"
            className="opacity-80 hover:opacity-100 hover:cursor-pointer"
          >
            <IconMenuOpen size={30} />
          </button>
        </div>

        <div className="px-6 pb-8 flex flex-col gap-6 overflow-y-auto">
          <ul className="flex flex-col gap-1 text-2xl font-bold">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => goTo(item.ref)}
                  className="py-2 w-full text-left hover:text-[#d7355b] hover:cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          {user && (
            <button
              onClick={logout}
              className="my-button hoverColor rounded-lg py-3 text-lg hover:cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default RightSideMenu;

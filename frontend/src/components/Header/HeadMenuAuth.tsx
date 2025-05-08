import type { User } from "../../types/user";
import IconLogin from "../logos/IconLogin";

interface MenuProps {
  setLoginMsg: (msg: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const HeadMenuAuth: React.FC<MenuProps> = ({ setLoginMsg, setUser }) => {
  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="headMenu flex gap-[15px] items-center">
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

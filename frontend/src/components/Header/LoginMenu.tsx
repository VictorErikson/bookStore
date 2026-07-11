import axios from "axios";
import { BASE_URL } from "../../config/api";
import IconLogin from "../logos/IconLogin";
import { useRef } from "react";
import checkLoginStatus from "../../services/checkLoginStatus";
import mergeAnonData from "../../services/mergeAnonData";
import { useAnonData } from "../../contexts/anonDataContext";
import type { User } from "../../types/user";

interface MenuProps {
  setLoginMsg: (msg: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuStatus: React.Dispatch<React.SetStateAction<string>>;
}

const LoginMenu: React.FC<MenuProps> = ({
  setLoginMsg,
  setUser,
  setIsLoggedin,
  setMenuStatus,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { anonLikes, anonRatings, clearAnonData } = useAnonData();

  const login = async () => {
    const identifier = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!identifier || !password) {
      return setLoginMsg("Please enter password and username");
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/local`, {
        identifier,
        password,
      });

      sessionStorage.setItem("token", response.data.jwt);
      let fetchedUser = await checkLoginStatus();
      if (
        fetchedUser &&
        (anonLikes.length > 0 || Object.keys(anonRatings).length > 0)
      ) {
        await mergeAnonData(fetchedUser, anonLikes, anonRatings);
        clearAnonData();
        fetchedUser = await checkLoginStatus();
      }
      setUser(fetchedUser);

      setIsLoggedin(!!fetchedUser);
      setLoginMsg("Login was successful!");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setLoginMsg(error.response?.data?.error?.message ?? "Login Failed");
      } else {
        setLoginMsg("Something went wrong");
      }
    }
  };
  return (
    <div className="headMenu flex flex-col w-full gap-[15px]">
      <input
        ref={usernameRef}
        type="text"
        name="username"
        placeholder="Username"
        className="w-full border border-white p-[5px] px-[10px] text-white opacity-50 active:rounded-none focus:opacity-100 focus:outline-none hover:opacity-100"
      />
      <div className="flex flex-col w-full">
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-white p-[5px] px-[10px] text-white opacity-50 active:rounded-none focus:opacity-100 focus:outline-none hover:opacity-100"
        />
        <button
          onClick={() => setMenuStatus("createUser")}
          className="text-white opacity-50 hover:opacity-100 self-end hover:cursor-pointer"
        >
          Create new account?
        </button>
      </div>
      <button
        onClick={() => login()}
        className="text-white w-full border border-white rounded-lg py-[10px] flex gap-[10px] items-center justify-center opacity-80 hover:opacity-100 hover:bg-white/10 hover:cursor-pointer"
      >
        Login <IconLogin />
      </button>
    </div>
  );
};

export default LoginMenu;

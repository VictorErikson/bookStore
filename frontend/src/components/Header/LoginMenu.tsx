import axios from "axios";
import IconLogin from "../logos/IconLogin";
import { useRef } from "react";
import checkLoginStatus from "../../services/checkLoginStatus";

interface MenuProps {
  setLoginMsg: (msg: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuStatus: React.Dispatch<React.SetStateAction<string>>;
}

const LoginMenu = ({
  setLoginMsg,
  setUser,
  isLoggedin,
  setIsLoggedin,
  setMenuStatus,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const login = async () => {
    const identifier = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!identifier || !password) {
      return setLoginMsg("Please enter password and username");
    }
    try {
      const response = await axios.post(
        "http://localhost:1338/api/auth/local",
        {
          identifier,
          password,
        }
      );

      sessionStorage.setItem("token", response.data.jwt);
      const fetchedUser = await checkLoginStatus();
      setUser(fetchedUser);

      setIsLoggedin(!!fetchedUser);
      setLoginMsg("Login was successful!");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setLoginMsg("Login Failed");
      } else {
        setLoginMsg("Something went wrong");
      }
    }
  };
  return (
    <div className="headMenu flex gap-[15px] items-center">
      <input
        ref={usernameRef}
        type="text"
        name="username"
        placeholder="Username"
        className="border border-white p-[5px] px-[10px] text-white opacity-50 active:rounded-none focus:opacity-100 focus:outline-none hover:opacity-100"
      />
      <div className="flex flex-col pt-[24px]">
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Password"
          className="border border-white p-[5px] px-[10px] text-white opacity-50 active:rounded-none focus:opacity-100 focus:outline-none hover:opacity-100"
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
        className="text-white flex gap-[10px] opacity-65 hover:opacity-100 hover:cursor-pointer"
      >
        Login <IconLogin />
      </button>
    </div>
  );
};

export default LoginMenu;

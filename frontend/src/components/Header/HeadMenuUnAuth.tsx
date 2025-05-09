import { useRef } from "react";
import IconLogin from "../logos/IconLogin";
import type { User } from "../../types/user";
import axios from "axios";
import checkLoginStatus from "../../services/checkLoginStatus";

interface MenuProps {
  setLoginMsg: (msg: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadMenuUnAuth: React.FC<MenuProps> = ({
  setLoginMsg,
  setUser,
  isLoggedin,
  setIsLoggedin,
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
      //   useEffect(() => {
      //     const fetchLoginStatus = async () => {
      //       const status = await checkLoginStatus();
      //       setIsLoggedin(!!status);
      //     };
      //     fetchLoginStatus();
      //   }, []);
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
      <hr className="border-gray-300 my-4 w-full" />
      <input
        ref={passwordRef}
        type="password"
        name="password"
        placeholder="Password"
        className="border border-white p-[5px] px-[10px] text-white opacity-50 active:rounded-none focus:opacity-100 focus:outline-none hover:opacity-100"
      />
      <hr className="border-gray-300 my-4 w-full" />
      <button
        onClick={() => login()}
        className="text-white flex gap-[10px] opacity-65 hover:opacity-100 hover:cursor-pointer"
      >
        Login <IconLogin />
      </button>
    </div>
  );
};

export default HeadMenuUnAuth;

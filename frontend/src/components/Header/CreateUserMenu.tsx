import axios from "axios";
import { BASE_URL } from "../../config/api";
import IconLogin from "../logos/IconLogin";
import { useRef, useState } from "react";
import checkLoginStatus from "../../services/checkLoginStatus";
import mergeAnonData from "../../services/mergeAnonData";
import { useAnonData } from "../../contexts/anonDataContext";
import { useToast } from "../../contexts/toastContext";
import type { User } from "../../types/user";

interface MenuProps {
  setLoginMsg: (msg: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuStatus: React.Dispatch<React.SetStateAction<string>>;
}

const CreateUserMenu: React.FC<MenuProps> = ({
  setLoginMsg,
  setUser,
  setIsLoggedin,
  setMenuStatus,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const { anonLikes, anonRatings, clearAnonData } = useAnonData();
  const { showToast } = useToast();

  const createUser = async () => {
    if (submittingRef.current) return;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = mailRef.current?.value;

    if (!username || !password || !email) {
      return setLoginMsg("Please enter password and username");
    }
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/local/register`,
        {
          username,
          email,
          password,
        },
        { timeout: 15000 }
      );

      sessionStorage.setItem("token", response.data.jwt);
      let fetchedUser = await checkLoginStatus();
      if (
        fetchedUser &&
        (anonLikes.length > 0 || Object.keys(anonRatings).length > 0)
      ) {
        const failedCount = await mergeAnonData(
          fetchedUser,
          anonLikes,
          anonRatings
        );
        if (failedCount > 0) {
          showToast(
            "Some of your saved likes or ratings couldn't be moved to your account."
          );
        } else {
          clearAnonData();
        }
        fetchedUser = await checkLoginStatus();
      }
      setUser(fetchedUser);

      setIsLoggedin(!!fetchedUser);
      setLoginMsg("Creating new user was successful!");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setLoginMsg(
          error.response?.data?.error?.message ?? "Creating user Failed"
        );
      } else {
        setLoginMsg("Something went wrong");
      }
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createUser();
      }}
      className="headMenu flex flex-col w-full gap-[15px]"
    >
      <input
        ref={usernameRef}
        type="text"
        name="username"
        placeholder="Username"
        disabled={submitting}
        className="w-full border border-white p-[5px] px-[10px] text-white opacity-50 active:rounded-none focus:opacity-100 focus:outline-none hover:opacity-100 disabled:opacity-30"
      />
      <input
        ref={mailRef}
        type="email"
        name="mail"
        placeholder="E-mail"
        disabled={submitting}
        className="w-full border border-white p-[5px] px-[10px] text-white opacity-50 active:rounded-none focus:opacity-100 focus:outline-none hover:opacity-100 disabled:opacity-30"
      />
      <div className="flex flex-col w-full">
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Password"
          disabled={submitting}
          className="w-full border border-white p-[5px] px-[10px] text-white opacity-50 active:rounded-none focus:opacity-100 focus:outline-none hover:opacity-100 disabled:opacity-30"
        />
        <button
          type="button"
          onClick={() => setMenuStatus("login")}
          className="text-white opacity-50 hover:opacity-100 self-end hover:cursor-pointer"
        >
          Already got an account?
        </button>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="text-white w-full border border-white rounded-lg py-[10px] flex gap-[10px] items-center justify-center opacity-80 hover:opacity-100 hover:bg-white/10 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        {submitting ? (
          <>
            <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create User <IconLogin />
          </>
        )}
      </button>
    </form>
  );
};

export default CreateUserMenu;

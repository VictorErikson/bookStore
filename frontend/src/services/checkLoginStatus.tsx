import axios from "axios";
import type { User } from "../types/user";
import { BASE_URL } from "../config/api";

const getData = async <T,>(url: string, jwt: string): Promise<T> => {
  const response = await axios.get<T>(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    timeout: 15000,
  });
  return response.data;
};

const checkLoginStatus = async () => {
  const jwt = sessionStorage.getItem("token");
  if (jwt) {
    const userData = await getData<User>(
      `${BASE_URL}/api/users/me?pLevel=4`,
      jwt
    );
    return userData;
  }
  console.log("NOT logged in");
  return null;
};

export default checkLoginStatus;

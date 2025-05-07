import axios from "axios";
import { BASE_URL } from "../config/api";

const getData = async <T,>(url: string, jwt: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return Promise.reject(error);
  }
};

const checkLoginStatus = async () => {
  const jwt = sessionStorage.getItem("token");
  if (jwt) {
    const userData = await getData(`${BASE_URL}/api/users/me?populate=*`, jwt);
    return userData.data;
  }
};

export default checkLoginStatus;

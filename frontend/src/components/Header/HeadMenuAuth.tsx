import type { User } from "../../types/user";

interface MenuProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const HeadMenuAuth: React.FC<MenuProps> = ({ setUser }) => {
  return;
};

export default HeadMenuAuth;

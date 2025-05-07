import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import type { User } from "./types/user";
import checkLoginStatus from "./services/checkLoginStatus";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const userData = await checkLoginStatus();

      setUser(userData);
    };
    checkLogin();
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;

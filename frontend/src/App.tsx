import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import type { User } from "./types/user";
import checkLoginStatus from "./services/checkLoginStatus";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookInfoProvider } from "./contexts/bookInfoContext";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const userData = await checkLoginStatus();
      setIsLoggedin(!!userData);
      setUser(userData);
    };
    checkLogin();
  }, []);

  return (
    <BookInfoProvider>
      <ThemeProvider>
        <Router>
          <Header
            user={user}
            setUser={setUser}
            isLoggedin={isLoggedin}
            setIsLoggedin={setIsLoggedin}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  setUser={setUser}
                  isLoggedin={isLoggedin}
                  setIsLoggedin={setIsLoggedin}
                />
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </BookInfoProvider>
  );
}

export default App;

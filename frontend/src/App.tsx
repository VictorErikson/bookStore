import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { useEffect, useRef, useState } from "react";
import type { User } from "./types/user";
import checkLoginStatus from "./services/checkLoginStatus";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookInfoProvider } from "./contexts/bookInfoContext";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const allBooksRef = useRef<HTMLDivElement>(null);
  const favouritesRef = useRef<HTMLDivElement>(null);
  const ratedRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  // const [menuIsOpen, setMenuIsOpen] = useState(false);

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
            allBooksRef={allBooksRef}
            favouritesRef={favouritesRef}
            ratedRef={ratedRef}
            reviewsRef={reviewsRef}

            // setMenuIsOpen={setMenuIsOpen}
            // menuIsOpen={menuIsOpen}
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
                  allBooksRef={allBooksRef}
                  favouritesRef={favouritesRef}
                  ratedRef={ratedRef}
                  reviewsRef={reviewsRef}
                  // setMenuIsOpen={setMenuIsOpen}
                  // menuIsOpen={menuIsOpen}
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

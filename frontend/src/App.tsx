import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { User } from "./types/user";
import checkLoginStatus from "./services/checkLoginStatus";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookInfoProvider } from "./contexts/bookInfoContext";
import { AnonDataProvider } from "./contexts/anonDataContext";
import { CartProvider } from "./contexts/cartContext";
import { ToastProvider } from "./contexts/toastContext";
import {
  USER_CACHE_KEY,
  clearCache,
  readCache,
  writeCache,
} from "./services/sessionCache";

const RESTORE_DELAYS = [2000, 4000, 8000, 10000, 10000];

function App() {
  const [user, setUser] = useState<User | null>(() =>
    sessionStorage.getItem("token") ? readCache<User>(USER_CACHE_KEY) : null
  );
  const [isLoggedin, setIsLoggedin] = useState(() => !!user);
  const allBooksRef = useRef<HTMLDivElement>(null);
  const favouritesRef = useRef<HTMLDivElement>(null);
  const ratedRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      writeCache(USER_CACHE_KEY, user);
    }
  }, [user]);

  useEffect(() => {
    let cancelled = false;

    const checkLogin = async () => {
      for (let attempt = 0; ; attempt++) {
        try {
          const userData = await checkLoginStatus();
          if (cancelled) return;
          setIsLoggedin(!!userData);
          setUser(userData);
          if (!userData) clearCache(USER_CACHE_KEY);
          return;
        } catch (error) {
          if (cancelled) return;
          const status = axios.isAxiosError(error)
            ? error.response?.status
            : undefined;
          if (status === 401 || status === 403) {
            sessionStorage.removeItem("token");
            clearCache(USER_CACHE_KEY);
            setUser(null);
            setIsLoggedin(false);
            return;
          }
          if (attempt >= RESTORE_DELAYS.length) return;
          await new Promise((resolve) =>
            setTimeout(resolve, RESTORE_DELAYS[attempt])
          );
        }
      }
    };

    checkLogin();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ToastProvider>
      <BookInfoProvider>
        <ThemeProvider>
          <AnonDataProvider>
          <CartProvider>
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
                  />
                }
              />
            </Routes>
          </Router>
          </CartProvider>
          </AnonDataProvider>
        </ThemeProvider>
      </BookInfoProvider>
    </ToastProvider>
  );
}

export default App;

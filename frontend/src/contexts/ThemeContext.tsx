import React, { createContext, useContext, useEffect, useState } from "react";
import fetchData from "../services/fetchData";
import { BASE_URL } from "../config/api";

export type ThemeName = "sale" | "darkmode" | "standard";

export interface Theme {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    theme: ThemeName;
  };
}

interface ThemeContextValue {
  theme: ThemeName | null;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: null });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeName | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetchData<Theme>(
          `${BASE_URL}/api/theme?populate=*`
        );
        setTheme(response.data.theme);
      } catch (err) {
        console.error("Could not load theme:", err);
      }
    };
    fetchTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

//to use the theme: const { theme } = useTheme(); then: if (!theme) return

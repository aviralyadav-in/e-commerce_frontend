import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

function getInitialTheme() {
  const savedTheme = localStorage.getItem("niyaTheme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const isDarkMode = theme === "dark";

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDarkMode);
    root.style.colorScheme = theme;

    localStorage.setItem("niyaTheme", theme);
  }, [theme, isDarkMode]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

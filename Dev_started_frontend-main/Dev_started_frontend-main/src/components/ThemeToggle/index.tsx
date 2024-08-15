"use client"

import { useEffect, useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || 'system'); // Default to system or stored value

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Apply initial theme setting
    if (theme === 'system') {
      document.documentElement.classList.toggle("dark", mediaQuery.matches);
    } else if (theme === 'dark') {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme); // Store current theme
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'dark') return 'light';
      if (prevTheme === 'light') return 'system';
      return 'dark';
    });
  };

  return (
    <div
      className="fixed bottom-3 left-3 z-50 cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Sun className="text-stone-800" size={24} />
      ) : theme === 'dark' ? (
        <Moon className="text-amber-400" size={24} />
      ) : (
        <SunMoon className="text-teal-500" size={24} />
      )}
    </div>
  );
};

export default ThemeToggle;
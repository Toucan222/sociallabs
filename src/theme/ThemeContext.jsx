import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * ThemeContext & ThemeProvider
 *
 * Lets the user toggle between light and dark mode.
 * - Toggles a class on the document body: either "light-mode" or "dark-mode".
 * - Stores the preference in localStorage.
 *
 * Usage:
 *   1. Wrap <App> in <ThemeProvider>.
 *   2. Call const { isDarkMode, toggleTheme } = useTheme().
 *   3. Provide a button to switch modes.
 */

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme_preference');
    if (stored === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, []);

  function toggleTheme() {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.remove('light-mode', 'dark-mode');
      if (newMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme_preference', 'dark');
      } else {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme_preference', 'light');
      }
      return newMode;
    });
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

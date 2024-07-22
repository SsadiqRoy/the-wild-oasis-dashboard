import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'darkMode'
  );

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add('dark-mode');
      html.classList.remove('light-mode');
    } else {
      html.classList.remove('dark-mode');
      html.classList.add('light-mode');
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((t) => !t);
  }

  return <DarkModeContext.Provider value={{ darkMode, toggleTheme }}>{children}</DarkModeContext.Provider>;
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error('useDarkMode is used outside DarkModeProvider');

  return context;
}

export { DarkModeProvider, useDarkMode };

    // src/context/ThemeContext.tsx
    import React, { createContext, useState, useContext, type ReactNode } from 'react';

    type Theme = 'light' | 'dark';

    interface ThemeContextProps {
      theme: Theme;
      toggleTheme: () => void;
    }

    const ThemeContext = createContext<ThemeContextProps>({
      theme: 'light',
      toggleTheme: () => {},
    });

    interface ThemeProviderProps {
      children: ReactNode;
    }

    export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
      const [theme, setTheme] = useState<Theme>('light');

      const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
      };

      return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    };

    export const useTheme = () => useContext(ThemeContext);
import { useTheme } from '../../context/ThemeContext';
import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '0',
        margin: '0',
        cursor: 'pointer',
        outline: 'none'
      }}
    >
      <Expand isDark={theme === 'dark'} duration={750} />
    </button>
  );
};

export default ThemeToggle;

import { Moon, Sun } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-full ${theme === 'dark'
                    ? 'bg-white text-gray-800 hover:bg-gray-100'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                } transition-colors`}
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeToggle;
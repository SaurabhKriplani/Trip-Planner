import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ThemeToggle from "../ui/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    console.log(user);
  }, [user]);

  const headerStyle = {
    background: theme === 'dark'
      ? "linear-gradient(90deg, #8290ff, #ec9eff, #fc7a7a)"
      : "linear-gradient(90deg, #10b981, #0ea5e9, #06b6d4)",
    backgroundSize: "200% 200%",
    animation: "gradientMove 8s ease infinite",
  };

  return (
    <header
      style={headerStyle}
      className="flex flex-col sm:flex-row justify-between items-center px-8 py-4 shadow-sm w-full"
    >
      {/* Keyframes for the gradient animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <img src="/logo.svg" alt="Travel" className="w-16 sm:w-20 md:w-24 h-auto" />
          <span className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
            FRAVEL
          </span>
        </div>
        {/* Hamburger menu for smaller screens */}
        <button
          className="sm:hidden block bg-transparent text-gray-100 text-2xl p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div
        className={`flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto ${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Show "Create Trip" button after sign in */}
        <SignedIn>
          <a href="/create-trip" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="rounded-full text-[#004D40] border-gray-900 hover:bg-gray-100 w-full"
            >
              + Create Trip
            </Button>
          </a>
        </SignedIn>

        {/* Show "My Trips" button and UserButton only when signed in */}
        <SignedIn>
          <a href="/my-trips" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="rounded-full text-[#004D40] border-gray-900 hover:bg-gray-100 w-full"
            >
              My Trips
            </Button>
          </a>

          <UserButton
            showName={false}
            afterSignOutUrl="/"
            className="rounded-full bg-black p-2 shadow-lg hover:shadow-xl"
          />
        </SignedIn>

        {/* Show Sign In button when the user is not signed in */}
        <SignedOut>
          <SignInButton mode="modal">
            <Button className={`px-5 py-2 rounded-md transition-colors duration-300 shadow-lg ${
              theme === 'dark'
                ? 'bg-black text-white hover:bg-slate-700'
                : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            }`}>
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;

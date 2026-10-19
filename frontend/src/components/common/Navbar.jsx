import { useState } from "react";
import { Menu, Moon, Sun, UserRound, LogOut, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#17141C]">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-white/10"
        >
          <Menu size={23} />
        </button>

        <div className="lg:hidden">
          <Logo />
        </div>

        <div className="hidden lg:block">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back,
          </p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Let's manage your money.
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-xl border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50 dark:hover:bg-white/10"
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-[#8211FA] dark:bg-purple-950">
              <UserRound size={21} />
            </div>

            <ChevronDown
              size={16}
              className="hidden text-gray-500 sm:block dark:text-gray-400"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-60 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#211C29]">
              <div className="border-b border-gray-100 px-3 py-3 dark:border-white/10">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Alex Morgan
                </p>
                <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                  alex.morgan@example.com
                </p>
              </div>

              <Link
                to="/settings"
                onClick={() => setProfileOpen(false)}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
              >
                <UserRound size={17} />
                My Profile
              </Link>

              <button
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

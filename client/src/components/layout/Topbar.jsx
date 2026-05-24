import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Moon, Sun } from "lucide-react";

import { logout } from "../../features/auth/authSlice";

import {
  applyTheme,
  getStoredTheme,
} from "../../utils/theme";

function Topbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const currentTheme = getStoredTheme();

  function handleLogout() {
    dispatch(logout());

    navigate("/login");
  }

  function toggleTheme() {
    const newTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    applyTheme(newTheme);

    window.location.reload();
  }

  return (
    <header
      className="
        h-16
        bg-white dark:bg-gray-950
        border-b border-gray-200 dark:border-gray-800
        flex items-center justify-between
        px-6
        transition-colors
      "
    >
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome
        </p>

        <h2 className="font-semibold text-gray-900 dark:text-white">
          {user?.name || "User"}
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-xl
            bg-gray-100 dark:bg-gray-900
            hover:bg-gray-200 dark:hover:bg-gray-800
            transition
          "
        >
          {currentTheme === "dark" ? (
            <Sun
              size={18}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={18}
              className="text-gray-700"
            />
          )}
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            px-4 py-2
            rounded-xl
            bg-gray-100 dark:bg-gray-900
            hover:bg-gray-200 dark:hover:bg-gray-800
            text-sm font-medium
            text-gray-800 dark:text-gray-200
            transition
          "
        >
          Logout
        </button>

      </div>
    </header>
  );
}

export default Topbar;
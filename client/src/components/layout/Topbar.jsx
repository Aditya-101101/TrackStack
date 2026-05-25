import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Moon,
  Sun,
  Menu,
} from "lucide-react";

import { logout } from "../../features/auth/authSlice";

import {
  applyTheme,
  getStoredTheme,
} from "../../utils/theme";

function Topbar({ setSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const [, setForceRender] = useState(false);

  const theme = getStoredTheme();

  useEffect(() => {
    const syncTheme = () => {
      setForceRender((p) => !p);
    };

    window.addEventListener(
      "theme-change",
      syncTheme
    );

    return () =>
      window.removeEventListener(
        "theme-change",
        syncTheme
      );
  }, []);

  function handleLogout() {
    dispatch(logout());

    navigate("/login");
  }

  function toggleTheme() {
    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    applyTheme(newTheme);

    window.dispatchEvent(
      new Event("theme-change")
    );
  }

  return (
    <header
      className="
        flex h-16 items-center justify-between
        border-b border-gray-200
        bg-gray-100 px-6
        transition-colors
        dark:border-gray-800 dark:bg-gray-950
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        
        {/* MOBILE SIDEBAR BUTTON */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-gray-200
            bg-white transition-colors
            dark:border-gray-800 dark:bg-gray-900
            md:hidden
          "
        >
          <Menu size={20} />
        </button>

        {/* USER INFO */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome
          </p>

          <h2 className="font-semibold text-gray-900 dark:text-white">
            {user?.name || "User"}
          </h2>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        
        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            rounded-xl bg-gray-200 p-2
            transition hover:bg-gray-300
            dark:bg-gray-900 dark:hover:bg-gray-800
          "
        >
          {theme === "dark" ? (
            <Sun
              size={18}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={18}
              className="text-gray-700 dark:text-gray-300"
            />
          )}
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            rounded-xl bg-gray-200
            px-4 py-2 text-sm font-medium
            text-gray-800 transition
            hover:bg-gray-300
            dark:bg-gray-900 dark:text-gray-200
            dark:hover:bg-gray-800
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
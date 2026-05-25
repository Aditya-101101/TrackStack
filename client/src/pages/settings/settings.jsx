import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/auth/authSlice.js";

import {
  applyTheme,
  getStoredTheme,
} from "../../utils/theme.js";

const Settings = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [theme, setTheme] = useState(getStoredTheme());

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;

    setTheme(selectedTheme);

    applyTheme(selectedTheme);

    window.dispatchEvent(
      new Event("theme-change")
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 page-main">

      {/* HEADER */}
      <div>
        <h1 className="page-title">Settings</h1>

        <p className="mt-1 muted-text">
          Manage your account preferences
        </p>
      </div>

      {/* PROFILE */}
      <div className="card card-padding space-y-5">

        <div>
          <h2 className="card-title">Profile</h2>

          <p className="mt-1 text-sm muted-text">
            Account information associated with your workspace
          </p>
        </div>

        <div className="space-y-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>

            <input
              type="text"
              value={user?.name || ""}
              disabled
              className="
                w-full rounded-xl border border-gray-200
                bg-gray-50 px-4 py-3 text-sm
                text-gray-700 outline-none
                dark:border-gray-800 dark:bg-gray-900
                dark:text-gray-300
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="
                w-full rounded-xl border border-gray-200
                bg-gray-50 px-4 py-3 text-sm
                text-gray-700 outline-none
                dark:border-gray-800 dark:bg-gray-900
                dark:text-gray-300
              "
            />
          </div>
        </div>
      </div>

      {/* APPEARANCE */}
      <div className="card card-padding">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="card-title">Appearance</h2>

            <p className="mt-1 text-sm muted-text">
              Customize the dashboard theme
            </p>
          </div>

          <select
            value={theme}
            onChange={handleThemeChange}
            className="
              rounded-xl border border-gray-200
              bg-white px-4 py-2.5 text-sm
              text-gray-900 outline-none transition-colors
              focus:border-blue-500
              dark:border-gray-800 dark:bg-gray-950
              dark:text-white
            "
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
              Danger Zone
            </h2>

            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              You will be signed out of your current session
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              rounded-xl bg-red-600 px-5 py-2.5
              text-sm font-medium text-white
              transition hover:bg-red-700
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
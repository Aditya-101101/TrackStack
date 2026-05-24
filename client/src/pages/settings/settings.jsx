import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { applyTheme, getStoredTheme } from "../../utils/theme.js";
import {useState} from "react";

const Settings = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [theme, setTheme] = useState(getStoredTheme());

  // console.log(user);
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeChange = (e) => {

    const selectedTheme = e.target.value;

    setTheme(selectedTheme);

    applyTheme(selectedTheme);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your account preferences
        </p>
      </div>

      {/* PROFILE SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Profile
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              value={user?.name || ""}
              disabled
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 outline-none"
            />
          </div>

        </div>
      </div>

      {/* APPEARANCE */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Appearance
        </h2>

        <div className="flex items-center justify-between">

          <div>
            <p className="font-medium text-gray-800">
              Theme
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Dark mode support coming soon
            </p>
          </div>

          <select
            value={theme}
            onChange={handleThemeChange}
            className="border border-gray-200 rounded-xl px-4 py-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="border border-red-200 bg-red-50 rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-red-700 mb-4">
          Danger Zone
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="font-medium text-gray-900">
              Logout Session
            </p>

            <p className="text-sm text-gray-600 mt-1">
              You will be signed out of your account.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>
      </div>

    </div>
  );
};

export default Settings;
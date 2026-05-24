import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Monitors",
    path: "/monitors",
    icon: Activity,
  },
  {
    name: "Incidents",
    path: "/incidents",
    icon: AlertTriangle,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside
      className="
        hidden md:flex flex-col
        w-64 min-h-screen
        bg-white dark:bg-gray-950
        border-r border-gray-200 dark:border-gray-800
        px-4 py-6
        transition-colors
      "
    >
      {/* LOGO */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          TrackStack
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Monitoring Platform
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? `
                        bg-black dark:bg-white
                        text-white dark:text-black
                        shadow-sm
                      `
                      : `
                        text-gray-700 dark:text-gray-300
                        hover:bg-gray-100 dark:hover:bg-gray-900
                      `
                  }
                `
              }
            >
              <Icon size={18} />

              <span>
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto pt-6">
        <div
          className="
            rounded-2xl
            bg-gray-100 dark:bg-gray-900
            p-4
            transition-colors
          "
        >
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            TrackStack
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Real-time uptime monitoring
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
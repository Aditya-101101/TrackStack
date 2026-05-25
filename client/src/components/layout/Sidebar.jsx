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

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
        fixed inset-0 z-40
        bg-black/40 backdrop-blur-sm
        md:hidden
      "
        />
      )}

      <aside
        className={`
      fixed inset-y-0 left-0 z-50
      flex w-64 flex-col
      border-r border-gray-200
      bg-gray-100 px-4 py-6
      transition-all duration-300
      dark:border-gray-800 dark:bg-gray-950

      ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

      md:static md:translate-x-0
    `}
      >
        
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            TrackStack
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitoring Platform
          </p>
        </div>

       
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                flex items-center gap-3
                rounded-xl px-4 py-3
                text-sm font-medium
                transition-all duration-200

                ${isActive
                    ? `
                      bg-black text-white shadow-sm
                      dark:bg-white dark:text-black
                    `
                    : `
                      text-gray-700 dark:text-gray-300
                      hover:bg-gray-200 dark:hover:bg-gray-900
                    `
                  }
              `
                }
              >
                <Icon size={18} />

                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto pt-6">
          <div
            className="
          rounded-2xl bg-gray-200 p-4
          transition-colors
          dark:bg-gray-900
        "
          >
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              TrackStack
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Real-time uptime monitoring
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
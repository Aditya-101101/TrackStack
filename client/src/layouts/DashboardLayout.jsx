import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import { useState } from "react";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-shell">
      <div className="flex min-w-0">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="min-h-screen flex-1 min-w-0 overflow-hidden">

          <Topbar
            setSidebarOpen={setSidebarOpen}
          />

          <main className="page-main">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";

function DashboardLayout() {
  return (
    <div className="page-shell">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 min-h-screen">
          <Topbar />

          <main className="page-main">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
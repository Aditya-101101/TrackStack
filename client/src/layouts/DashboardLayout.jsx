import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 min-h-screen">
          <Topbar />

          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
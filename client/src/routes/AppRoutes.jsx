import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";

import Monitors from "../pages/monitors/Monitor.jsx";
import CreateMonitor from "../pages/monitors/CreateMonitor.jsx";
import EditMonitor from "../pages/monitors/EditMonitor.jsx";
import MonitorDetails from "../pages/monitors/MonitorDetails.jsx";

import Incidents from "../pages/incidents/Incidents.jsx";
import Settings from "../pages/settings/settings.jsx";
import NotFound from "../pages/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="monitors" element={<Monitors />} />
        <Route path="monitors/create" element={<CreateMonitor />} />
        <Route path="monitors/:id/edit" element={<EditMonitor />} />
        <Route path="monitors/:id" element={<MonitorDetails />} />

        <Route path="incidents" element={<Incidents />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
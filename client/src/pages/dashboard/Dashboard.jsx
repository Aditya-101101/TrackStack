import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import { fetchDashboardSummary } from "../../features/dashboard/dashboardSlice.js";
import StatCard from "../../components/common/StatCard.jsx";

function Dashboard() {
  const dispatch = useDispatch();

  const { summary, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  if (loading) {
    return <p className="text-gray-600">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  const totalMonitors = summary?.totalMonitors ?? 0;
  const upMonitors = summary?.upMonitors ?? 0;
  const downMonitors = summary?.downMonitors ?? 0;
  const pausedMonitors = summary?.pausedMonitors ?? 0;
  const openIncidents = summary?.openIncidents ?? 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your uptime monitoring system.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Monitors"
          value={totalMonitors}
          subtitle="All monitors created"
          icon={Activity}
        />

        <StatCard
          title="Up"
          value={upMonitors}
          subtitle="Currently healthy"
          icon={CheckCircle}
        />

        <StatCard
          title="Down"
          value={downMonitors}
          subtitle="Currently failing"
          icon={XCircle}
        />

        <StatCard
          title="Paused"
          value={pausedMonitors}
          subtitle="Not being checked"
          icon={Clock}
        />

        <StatCard
          title="Open Incidents"
          value={openIncidents}
          subtitle="Needs attention"
          icon={AlertTriangle}
        />
      </div>
    </div>
  );
}

export default Dashboard;
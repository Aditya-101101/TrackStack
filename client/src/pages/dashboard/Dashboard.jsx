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
import { fetchOpenIncidents } from "../../features/incidents/incidentSlice.js";
import ResponseTimeChart from "../../components/charts/ResponseTimeChart.jsx";
import { fetchMonitors } from "../../features/monitors/monitorSlice.js";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton.jsx";


function Dashboard() {
  const dispatch = useDispatch();

  const { summary, loading, error } = useSelector((state) => state.dashboard);

  const { OpenIncidents } = useSelector(
    (state) => state.incidents
  );

  const { monitors } = useSelector(
    (state) => state.monitors
  );

  useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(fetchOpenIncidents());
    dispatch(fetchMonitors());
  }, [dispatch]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="alert-error">
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
    <div className="space-y-10">
      <div className="mb-6">
        <h1 className="page-title">Dashboard</h1>
        <p className="muted-text mt-1">
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

      <div>
        <h2 className="section-title mb-4">
          Open Incidents
        </h2>

        {OpenIncidents.length === 0 ? (
          <div className="card card-padding">
            <p className="text-green-400 font-medium">
              No active incidents 🎉
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {OpenIncidents.map((incident) => (
              <div
                key={incident._id}
                className="card card-padding border-red-500"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="card-title">
                      {incident.monitor?.name}
                    </h3>

                    <p className="text-red-400 mt-1">
                      Incident OPEN
                    </p>
                  </div>

                  <span className="text-sm muted-text">
                    {new Date(
                      incident.startedAt || incident.createdAt
                    ).toLocaleString()}
                  </span>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {summary?.recentChecks?.length > 0 && (
        <ResponseTimeChart
          data={summary.recentChecks}
        />
      )}

      <div>
        <h2 className="section-title mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {summary?.recentChecks?.slice(0, 10).map((check) => (
            <div
              key={check._id}
              className="card card-padding flex justify-between items-center"
            >
              <div>
                <h3 className="card-title">
                  {check.monitorId?.name || "Monitor"}
                </h3>

                <p
                  className={`text-sm mt-1 ${check.status === "UP"
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {check.status === "UP"
                    ? "Check successful"
                    : check.errorMessage || "Check failed"}
                </p>
              </div>

              <div className="text-right text-sm muted-text">
                <p>
                  {check.responseTime || "-"} ms
                </p>

                <p>
                  {new Date(
                    check.checkedAt || check.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="section-title mb-4">
          Recent Monitors
        </h2>

        {monitors.length === 0 ? (
          <div className="card card-padding muted-text">
            <p>No monitors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {monitors.slice(0, 6).map((monitor) => (
              <div
                key={monitor._id}
                className="card card-padding"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="card-title">
                      {monitor.name}
                    </h3>

                    <p className="muted-text text-sm mt-1 truncate word-wrap">
                      {monitor.url}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-semibold ${!monitor.isActive
                        ? "text-yellow-400"
                        : monitor.status === "UP"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                  >
                    {!monitor.isActive
                      ? "PAUSED"
                      : monitor.status}
                  </span>
                </div>

                <div className="mt-4 flex justify-between text-sm muted-text">
                  <span>
                    {monitor.lastResponseTime || "-"} ms
                  </span>

                  <span>
                    {monitor.method}
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
 
    </div>
  );
}

export default Dashboard;
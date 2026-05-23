import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonitorResults } from "../../features/results/resultSlice.js";
import { fetchMonitorStats } from "../../features/stats/statsSlice.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Pencil,
  Play,
  Pause,
  Trash2,
} from "lucide-react";

import { fetchMonitorById, manualCheckMonitor, clearCheckMessage, toggleMonitorActive, deleteMonitor } from "../../features/monitors/monitorSlice.js";
import MonitorStatusBadge from "../../components/monitor/MonitorStatusBadge.jsx";
import { fetchMonitorIncidents } from "../../features/incidents/incidentSlice.js";
import ResponseTimeChart from "../../components/charts/ResponseTimeChart.jsx";
import StatusHistoryChart from "../../components/charts/StatusHistoryChart.jsx";
import UptimeChart from "../../components/charts/UptimeChart";

const MonitorDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showResults, setShowResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { selectedMonitor, loading, checking, checkMessage, error } = useSelector(
    (state) => state.monitors
  );

  const { results, loading: resultsLoading } = useSelector(
    (state) => state.results
  );

  const { stats, loading: statsLoading } = useSelector(
    (state) => state.stats
  );

  const { monitorIncidents } = useSelector(
    (state) => state.incidents
  );

  useEffect(() => {
    dispatch(fetchMonitorById(id));
    dispatch(fetchMonitorResults(id));
    dispatch(fetchMonitorStats(id));
    dispatch(fetchMonitorIncidents(id));
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-gray-500">Loading monitor...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!selectedMonitor) {
    return <div className="text-gray-500">Monitor not found.</div>;
  }

  const handleManualCheck = async () => {
    const result = await dispatch(manualCheckMonitor(id));

    // console.log("MANUAL CHECK DISPATCH RESULT:", result);

    if (manualCheckMonitor.fulfilled.match(result)) {
      setTimeout(() => {
        dispatch(fetchMonitorById(id));
      }, 1500);

      setTimeout(() => {
        dispatch(clearCheckMessage());
      }, 3000);
    }
  };

  const handleToggleActive = async () => {
    const nextActiveState = !selectedMonitor.isActive;

    const result = await dispatch(
      toggleMonitorActive({
        id,
        isActive: nextActiveState,
      })
    );

    // console.log("TOGGLE ACTIVE DISPATCH RESULT:", result);
  };

  const handleDeleteMonitor = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this monitor?"
    );

    if (!confirmed) return;

    const result = await dispatch(deleteMonitor(id));

    // console.log("DELETE DISPATCH RESULT:", result);

    if (deleteMonitor.fulfilled.match(result)) {
      navigate("/monitors");
    }
  };

  return (
    <div>
      <Link
        to="/monitors"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={16} />
        Back to Monitors
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedMonitor.name}
              </h1>

              <MonitorStatusBadge
                status={!selectedMonitor.isActive ? "PAUSED" : selectedMonitor.status}
              />
            </div>

            <a
              href={selectedMonitor.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-gray-500 hover:text-blue-600"
            >
              {selectedMonitor.url}
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleManualCheck}
              disabled={checking}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Play size={16} />
              {checking ? "Queueing..." : "Manual Check"}
            </button>

            <Link
              to={`/monitors/${selectedMonitor._id}/edit`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium"
            >
              <Pencil size={16} />
              Edit
            </Link>

            <button
              onClick={handleToggleActive}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {selectedMonitor.isActive ? (
                <>
                  <Pause size={16} />
                  {loading ? "Pausing..." : "Pause"}
                </>
              ) : (
                <>
                  <Play size={16} />
                  {loading ? "Resuming..." : "Resume"}
                </>
              )}
            </button>

            <button
              onClick={handleDeleteMonitor}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Trash2 size={16} />
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {checkMessage && (
          <div className="mt-6 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-lg text-sm">
            {checkMessage}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Method</p>
            <p className="text-lg font-semibold mt-1">
              {selectedMonitor.method || "-"}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Interval</p>
            <p className="text-lg font-semibold mt-1">
              {selectedMonitor.interval ? `${selectedMonitor.interval} sec` : "-"}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Timeout</p>
            <p className="text-lg font-semibold mt-1">
              {selectedMonitor.timeout ? `${selectedMonitor.timeout / 1000} sec` : "-"}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Response Time</p>
            <p className="text-lg font-semibold mt-1">
              {selectedMonitor.lastResponseTime
                ? `${selectedMonitor.lastResponseTime} ms`
                : "-"}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Consecutive Successes</p>
            <p className="text-lg font-semibold mt-1">
              {selectedMonitor.consecutiveSuccesses || 0}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Consecutive Failures</p>
            <p className="text-lg font-semibold mt-1">
              {selectedMonitor.consecutiveFailures || 0}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Last Checked</p>
            <p className="text-lg font-semibold mt-1">
              {selectedMonitor.lastCheckedAt
                ? new Date(selectedMonitor.lastCheckedAt).toLocaleString()
                : "-"}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Next Check</p>
            <p className="text-lg font-semibold mt-1">
              {selectedMonitor.nextCheckAt
                ? new Date(selectedMonitor.nextCheckAt).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Monitor Statistics
        </h2>

        {statsLoading ? (
          <p>Loading stats...</p>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">
                Uptime Percentage
              </h3>

              <p className="text-2xl font-bold text-green-400">
                {stats.uptimePercentage}%
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">
                Total Checks
              </h3>

              <p className="text-2xl text-gray-200 font-bold">
                {stats.totalChecks}
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">
                Successful Checks
              </h3>

              <p className="text-2xl font-bold text-green-400">
                {stats.upChecks}
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">
                Failed Checks
              </h3>

              <p className="text-2xl font-bold text-red-400">
                {stats.downChecks}
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">
                Average Response Time
              </h3>

              <p className="text-2xl text-gray-200 font-bold">
                {stats.avgResponseTime} ms
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">
                Current Status
              </h3>

              <p
                className={`text-2xl font-bold ${stats.monitor.status === "UP"
                  ? "text-green-400"
                  : "text-red-400"
                  }`}
              >
                {stats.monitor.status}
              </p>
            </div>

          </div>
        ) : (
          <p>No stats available.</p>
        )}
      </div>

      {stats?.last24hChecks?.length > 0 && (
        <ResponseTimeChart
          data={stats.last24hChecks}
        />
      )}

      {stats?.last24hChecks?.length > 0 && (
        <StatusHistoryChart
          data={stats.last24hChecks}
        />
      )}

      {stats && (
        <UptimeChart
          upChecks={stats.upChecks}
          downChecks={stats.downChecks}
        />
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-semibold">
            Incidents History
          </h2>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-gray-800  text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            {showHistory ? "Hide Incidents" : "Show Incidents"}
          </button>

        </div>

        {showHistory && (monitorIncidents.length === 0 ? (
          <p>No incidents found for this monitor.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Started At</th>
                  <th className="p-3 text-left">Resolved At</th>
                </tr>
              </thead>

              <tbody>
                {monitorIncidents.map((incident) => (
                  <tr
                    key={incident._id}
                    className="border-t border-gray-700"
                  >
                    <td className="p-3">
                      <span
                        className={`font-semibold ${incident.status === "OPEN"
                          ? "text-red-500"
                          : "text-green-500"
                          }`}
                      >
                        {incident.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(
                        incident.startedAt || incident.createdAt
                      ).toLocaleString()}
                    </td>

                    <td className="p-3">
                      {incident.resolvedAt
                        ? new Date(
                          incident.resolvedAt
                        ).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-semibold">
            Recent Checks
          </h2>

          <button
            onClick={() => setShowResults(!showResults)}
            className="bg-gray-800  text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            {showResults ? "Hide Results" : "Show Results"}
          </button>

        </div>

        {showResults && (resultsLoading ? (
          <p>Loading results...</p>
        ) : results.length === 0 ? (
          <p>No check history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Response Time</th>
                  <th className="p-3 text-left">Status Code</th>
                  <th className="p-3 text-left">Checked At</th>
                  <th className="p-3 text-left">Error</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => (
                  <tr
                    key={result._id}
                    className="border-t border-gray-700"
                  >
                    <td className="p-3">
                      <span
                        className={
                          result.status === "UP"
                            ? "text-green-500 font-semibold"
                            : "text-red-500 font-semibold"
                        }
                      >
                        {result.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {result.responseTime ?? "-"} ms
                    </td>

                    <td className="p-3">
                      {result.statusCode ?? "-"}
                    </td>

                    <td className="p-3">
                      {new Date(result.createdAt).toLocaleString()}
                    </td>

                    <td className="p-3 text-red-400">
                      {result.errorMessage || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MonitorDetails;
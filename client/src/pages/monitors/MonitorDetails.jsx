import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMonitorById,
  manualCheckMonitor,
  clearCheckMessage,
  toggleMonitorActive,
  deleteMonitor,
} from "../../features/monitors/monitorSlice.js";

import { fetchMonitorResults } from "../../features/results/resultSlice.js";
import { fetchMonitorStats } from "../../features/stats/statsSlice.js";
import { fetchMonitorIncidents } from "../../features/incidents/incidentSlice.js";

import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ExternalLink,
  Pencil,
  Play,
  Pause,
  Trash2,
} from "lucide-react";

import MonitorStatusBadge from "../../components/monitor/MonitorStatusBadge.jsx";

import ResponseTimeChart from "../../components/charts/ResponseTimeChart.jsx";
import StatusHistoryChart from "../../components/charts/StatusHistoryChart.jsx";
import UptimeChart from "../../components/charts/UptimeChart.jsx";

import MonitorDetailsSkeleton from "../../components/skeletons/MonitorDetailsSkeleton.jsx";

const btnOutline =
  "inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900";

const btnDanger =
  "inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20";

const tableTh =
  "p-4 text-left text-sm font-semibold whitespace-nowrap";

const tableRow =
  "border-t border-gray-200 dark:border-gray-800";

const MONITOR_METRICS = (monitor) => [
  {
    label: "Method",
    value: monitor.method || "-",
  },
  {
    label: "Interval",
    value: monitor.interval
      ? `${monitor.interval} sec`
      : "-",
  },
  {
    label: "Timeout",
    value: monitor.timeout
      ? `${monitor.timeout / 1000} sec`
      : "-",
  },
  {
    label: "Response Time",
    value: monitor.lastResponseTime
      ? `${monitor.lastResponseTime} ms`
      : "-",
  },
  {
    label: "Consecutive Successes",
    value: monitor.consecutiveSuccesses || 0,
  },
  {
    label: "Consecutive Failures",
    value: monitor.consecutiveFailures || 0,
  },
  {
    label: "Last Checked",
    value: monitor.lastCheckedAt
      ? new Date(
          monitor.lastCheckedAt
        ).toLocaleString()
      : "-",
  },
  {
    label: "Next Check",
    value: monitor.nextCheckAt
      ? new Date(
          monitor.nextCheckAt
        ).toLocaleString()
      : "-",
  },
];

const MonitorDetails = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const [showResults, setShowResults] =
    useState(false);

  const [showHistory, setShowHistory] =
    useState(false);

  const {
    selectedMonitor,
    loading,
    checking,
    checkMessage,
    error,
  } = useSelector((state) => state.monitors);

  const {
    results,
    loading: resultsLoading,
  } = useSelector((state) => state.results);

  const {
    stats,
    loading: statsLoading,
  } = useSelector((state) => state.stats);

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
    return <MonitorDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
        {error}
      </div>
    );
  }

  if (!selectedMonitor) {
    return (
      <p className="muted-text">
        Monitor not found.
      </p>
    );
  }

  const handleManualCheck = async () => {
    const result = await dispatch(
      manualCheckMonitor(id)
    );

    if (
      manualCheckMonitor.fulfilled.match(
        result
      )
    ) {
      setTimeout(
        () => dispatch(fetchMonitorById(id)),
        1500
      );

      setTimeout(
        () => dispatch(clearCheckMessage()),
        3000
      );
    }
  };

  const handleToggleActive = async () => {
    await dispatch(
      toggleMonitorActive({
        id,
        isActive:
          !selectedMonitor.isActive,
      })
    );
  };

  const handleDeleteMonitor = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this monitor?"
    );

    if (!confirmed) return;

    const result = await dispatch(
      deleteMonitor(id)
    );

    if (
      deleteMonitor.fulfilled.match(result)
    ) {
      navigate("/monitors");
    }
  };

  const displayStatus =
    !selectedMonitor.isActive
      ? "PAUSED"
      : selectedMonitor.status;

  const statCards = stats
    ? [
        {
          label: "Uptime Percentage",
          value: `${stats.uptimePercentage}%`,
          valueClass:
            "mt-2 text-3xl font-bold text-green-400",
        },
        {
          label: "Total Checks",
          value: stats.totalChecks,
          valueClass:
            "mt-2 text-3xl font-bold text-gray-900 dark:text-white",
        },
        {
          label: "Successful Checks",
          value: stats.upChecks,
          valueClass:
            "mt-2 text-3xl font-bold text-green-400",
        },
        {
          label: "Failed Checks",
          value: stats.downChecks,
          valueClass:
            "mt-2 text-3xl font-bold text-red-400",
        },
        {
          label:
            "Average Response Time",
          value: `${stats.avgResponseTime} ms`,
          valueClass:
            "mt-2 text-3xl font-bold text-gray-900 dark:text-white",
        },
        {
          label: "Current Status",
          value: stats.monitor.status,
          valueClass: `mt-2 text-3xl font-bold ${
            stats.monitor.status ===
            "UP"
              ? "text-green-400"
              : "text-red-400"
          }`,
        },
      ]
    : [];

  return (
    <div className="min-w-0 space-y-8">
      
      {/* BACK */}
      <Link
        to="/monitors"
        className="inline-flex items-center gap-2 text-sm muted-text transition-colors hover:text-gray-900 dark:hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Monitors
      </Link>

      {/* HEADER */}
      <div className="card min-w-0 p-6">
        
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="page-title wrap-break-word">
                {selectedMonitor.name}
              </h1>

              <MonitorStatusBadge
                status={displayStatus}
              />
            </div>

            <a
              href={selectedMonitor.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex break-all text-sm muted-text transition-colors hover:text-blue-500"
            >
              {selectedMonitor.url}
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            
            <button
              onClick={handleManualCheck}
              disabled={checking}
              className={btnOutline}
            >
              <Play size={16} />

              {checking
                ? "Queueing..."
                : "Manual Check"}
            </button>

            <Link
              to={`/monitors/${selectedMonitor._id}/edit`}
              className={btnOutline}
            >
              <Pencil size={16} />
              Edit
            </Link>

            <button
              onClick={handleToggleActive}
              disabled={loading}
              className={btnOutline}
            >
              {selectedMonitor.isActive ? (
                <>
                  <Pause size={16} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={16} />
                  Resume
                </>
              )}
            </button>

            <button
              onClick={handleDeleteMonitor}
              disabled={loading}
              className={btnDanger}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {checkMessage && (
          <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {checkMessage}
          </div>
        )}

        {/* METRICS */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          
          {MONITOR_METRICS(
            selectedMonitor
          ).map((item) => (
            <div
              key={item.label}
              className="card p-5"
            >
              <p className="stat-label">
                {item.label}
              </p>

              <p className="stat-value wrap-break-word">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="min-w-0">
        
        <h2 className="section-title mb-4">
          Monitor Statistics
        </h2>

        {statsLoading ? (
          <p className="muted-text">
            Loading stats...
          </p>
        ) : stats ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            
            {statCards.map((card) => (
              <div
                key={card.label}
                className="card p-5"
              >
                <p className="text-sm muted-text">
                  {card.label}
                </p>

                <p className={card.valueClass}>
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted-text">
            No stats available.
          </p>
        )}
      </div>

      {/* CHARTS */}
      {stats?.last24hChecks?.length >
        0 && (
        <ResponseTimeChart
          data={stats.last24hChecks}
        />
      )}

      {stats?.last24hChecks?.length >
        0 && (
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

      {/* INCIDENTS */}
      <div className="min-w-0">
        
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="section-title">
            Incidents History
          </h2>

          <button
            onClick={() =>
              setShowHistory(
                !showHistory
              )
            }
            className={btnOutline}
          >
            {showHistory
              ? "Hide Incidents"
              : "Show Incidents"}
          </button>
        </div>

        {showHistory &&
          (monitorIncidents.length ===
          0 ? (
            <p className="muted-text">
              No incidents found.
            </p>
          ) : (
            <div className="card min-w-0">
              
              <div className="w-full overflow-x-auto">
                
                <table className="w-full min-w-175">
                  
                  <thead className="bg-gray-100 dark:bg-gray-900">
                    <tr>
                      <th className={tableTh}>
                        Status
                      </th>

                      <th className={tableTh}>
                        Started At
                      </th>

                      <th className={tableTh}>
                        Resolved At
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {monitorIncidents.map(
                      (incident) => (
                        <tr
                          key={incident._id}
                          className={tableRow}
                        >
                          <td className="p-4 whitespace-nowrap">
                            <span
                              className={
                                incident.status ===
                                "OPEN"
                                  ? "font-semibold text-red-400"
                                  : "font-semibold text-green-400"
                              }
                            >
                              {
                                incident.status
                              }
                            </span>
                          </td>

                          <td className="whitespace-nowrap p-4">
                            {new Date(
                              incident.startedAt ||
                                incident.createdAt
                            ).toLocaleString()}
                          </td>

                          <td className="whitespace-nowrap p-4">
                            {incident.resolvedAt
                              ? new Date(
                                  incident.resolvedAt
                                ).toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>

      {/* RECENT CHECKS */}
      <div className="min-w-0">
        
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="section-title">
            Recent Checks
          </h2>

          <button
            onClick={() =>
              setShowResults(
                !showResults
              )
            }
            className={btnOutline}
          >
            {showResults
              ? "Hide Results"
              : "Show Results"}
          </button>
        </div>

        {showResults &&
          (resultsLoading ? (
            <p className="muted-text">
              Loading results...
            </p>
          ) : results.length === 0 ? (
            <p className="muted-text">
              No check history found.
            </p>
          ) : (
            <div className="card min-w-0">
              
              <div className="w-full overflow-x-auto">
                
                <table className="w-full min-w-237.5">
                  
                  <thead className="bg-gray-100 dark:bg-gray-900">
                    <tr>
                      <th className={tableTh}>
                        Status
                      </th>

                      <th className={tableTh}>
                        Response Time
                      </th>

                      <th className={tableTh}>
                        Status Code
                      </th>

                      <th className={tableTh}>
                        Checked At
                      </th>

                      <th className={tableTh}>
                        Error
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.map(
                      (result) => (
                        <tr
                          key={result._id}
                          className={tableRow}
                        >
                          <td className="whitespace-nowrap p-4">
                            <span
                              className={
                                result.status ===
                                "UP"
                                  ? "font-semibold text-green-400"
                                  : "font-semibold text-red-400"
                              }
                            >
                              {
                                result.status
                              }
                            </span>
                          </td>

                          <td className="whitespace-nowrap p-4">
                            {result.responseTime ??
                              "-"}{" "}
                            ms
                          </td>

                          <td className="whitespace-nowrap p-4">
                            {result.statusCode ??
                              "-"}
                          </td>

                          <td className="whitespace-nowrap p-4">
                            {new Date(
                              result.createdAt
                            ).toLocaleString()}
                          </td>

                          <td className="max-w-65 truncate p-4 text-red-400">
                            {result.errorMessage ||
                              "-"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MonitorDetails;
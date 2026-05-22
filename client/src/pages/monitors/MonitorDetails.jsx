import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const MonitorDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedMonitor, loading, checking, checkMessage, error } = useSelector(
    (state) => state.monitors
  );

  useEffect(() => {
    dispatch(fetchMonitorById(id));
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
    </div>
  );
};

export default MonitorDetails;
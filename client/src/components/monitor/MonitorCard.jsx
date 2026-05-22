import { Link } from "react-router-dom";
import { Activity, Clock, ExternalLink, Timer } from "lucide-react";
import MonitorStatusBadge from "./MonitorStatusBadge.jsx";

function MonitorCard({ monitor }) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-gray-500" />
            <h3 className="font-semibold text-lg">{monitor.name}</h3>
          </div>

          <a
            href={monitor.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-sm text-gray-500 hover:text-black flex items-center gap-1"
          >
            {monitor.url}
            <ExternalLink size={14} />
          </a>
        </div>

        <MonitorStatusBadge
          status={!monitor.isActive ? "PAUSED" : monitor.status}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
        <div>
          <p className="text-gray-500">Method</p>
          <p className="font-medium text-gray-900">
            {monitor.method || "GET"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Interval</p>
          <p className="font-medium text-gray-900">
            {monitor.interval ? `${monitor.interval} sec` : "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Timeout</p>
          <p className="font-medium text-gray-900">
            {monitor.timeout ? `${monitor.timeout / 1000} sec` : "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Response Time</p>
          <p className="font-medium text-gray-900">
            {monitor.lastResponseTime ? `${monitor.lastResponseTime} ms` : "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Last Checked</p>
          <p className="font-medium text-gray-900">
            {monitor.lastCheckedAt
              ? new Date(monitor.lastCheckedAt).toLocaleString()
              : "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Active</p>
          <p className="font-medium text-gray-900">
            {monitor.isActive ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-xs text-gray-500">
          {monitor.isActive ? "Active" : "Paused"}
        </p>

        <Link
          to={`/monitors/${monitor._id}`}
          className="text-sm font-medium text-black hover:underline"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export default MonitorCard;
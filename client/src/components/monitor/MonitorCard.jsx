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

        <MonitorStatusBadge status={monitor.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Timer size={15} />
            Response
          </div>
          <p className="font-semibold mt-1">
            {monitor.lastResponseTime != null
              ? `${monitor.lastResponseTime} ms`
              : "N/A"}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={15} />
            Interval
          </div>
          <p className="font-semibold mt-1">
            {monitor.intervalMinutes || monitor.interval || "N/A"} min
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
import { Link } from "react-router-dom";
import {
  Activity,
  ExternalLink,
} from "lucide-react";

import MonitorStatusBadge from "./MonitorStatusBadge.jsx";

function MonitorCard({ monitor }) {

  const displayStatus = !monitor.isActive
    ? "PAUSED"
    : monitor.status;

  const responseTimeClass =
    displayStatus === "UP"
      ? "text-green-400"
      : displayStatus === "DOWN"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div
      className="
        card
        p-6
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <div className="flex items-center gap-3">

            <div
              className="
                w-9 h-9
                rounded-xl
                bg-gray-100 dark:bg-gray-900
                flex items-center justify-center
                shrink-0
              "
            >
              <Activity
                size={18}
                className="text-gray-700 dark:text-gray-300"
              />
            </div>

            <h3
              className="
                text-xl font-semibold
                text-gray-900 dark:text-white
                truncate
              "
            >
              {monitor.name}
            </h3>

          </div>

          <a
            href={monitor.url}
            target="_blank"
            rel="noreferrer"
            className="
              mt-3
              text-sm
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-white
              flex items-center gap-1
              transition-colors
              truncate
            "
          >
            {monitor.url}

            <ExternalLink
              size={14}
              className="shrink-0"
            />
          </a>

        </div>

        <MonitorStatusBadge
          status={displayStatus}
        />

      </div>

      {/* METRICS */}
      <div
        className="
          grid grid-cols-2
          gap-x-6 gap-y-5
          mt-8
        "
      >

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Method
          </p>

          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
            {monitor.method || "GET"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Interval
          </p>

          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
            {monitor.interval
              ? `${monitor.interval} sec`
              : "-"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Timeout
          </p>

          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
            {monitor.timeout
              ? `${monitor.timeout / 1000} sec`
              : "-"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Response Time
          </p>

          <p
            className={`
              mt-1 text-base font-semibold
              ${responseTimeClass}
            `}
          >
            {monitor.lastResponseTime
              ? `${monitor.lastResponseTime} ms`
              : "-"}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Last Checked
          </p>

          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
            {monitor.lastCheckedAt
              ? new Date(
                  monitor.lastCheckedAt
                ).toLocaleString()
              : "-"}
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <div
        className="
          mt-8
          pt-4
          border-t border-gray-200 dark:border-gray-800
          flex items-center justify-between
        "
      >

        <div
          className={`
            px-3 py-1
            rounded-full
            text-xs font-semibold
            ${
              monitor.isActive
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }
          `}
        >
          {monitor.isActive
            ? "ACTIVE"
            : "PAUSED"}
        </div>

        <Link
          to={`/monitors/${monitor._id}`}
          className="
            text-sm font-medium
            text-gray-500 dark:text-gray-400
            hover:text-gray-900 dark:hover:text-white
            transition-colors
          "
        >
          View details
        </Link>

      </div>

    </div>
  );
}

export default MonitorCard;
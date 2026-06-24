import { formatDistanceToNow } from "date-fns";

const formatDuration = (start, end) => {
  const diff =
    (end ? new Date(end) : new Date()) -
    new Date(start);

  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;

  const hrs = Math.floor(mins / 60);

  if (hrs < 24)
    return `${hrs}h ${mins % 60}m`;
  const days = Math.floor(hrs / 24);
  return `${days}d ${hrs % 24}h`;
};

const IncidentCard = ({ incident }) => {
  const isOpen = incident.status === "OPEN";

  return (
    <div
      className={`
        card card-padding border-l-4 transition-colors
        ${isOpen
          ? "border-red-500 bg-red-500/5"
          : "border-green-500 bg-green-500/5"
        }
      `}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        {/* LEFT */}
        <div className="flex items-start gap-4">
          {/* STATUS DOT */}
          <div className="relative mt-1.5 shrink-0">
            <div
              className={`
                h-3 w-3 rounded-full
                ${isOpen
                  ? "bg-red-500"
                  : "bg-green-500"
                }
              `}
            />
            {isOpen && (
              <div className="absolute inset-0 animate-ping rounded-full bg-red-400" />
            )}
          </div>
          {/* CONTENT */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="card-title wrap-break-word">
                {incident.monitorId?.name ||
                  "Unknown Monitor"}
              </h2>
              <span
                className={`
                  status-badge
                  ${isOpen
                    ? "status-badge-down"
                    : "status-badge-up"
                  }
                `}
              >
                {incident.status}
              </span>
            </div>
            <p className="mt-1 break-all text-sm muted-text">
              {incident.monitorId?.url}
            </p>
            <div className="mt-4 space-y-1.5 text-sm">
              <p
                title={new Date(
                  incident.startedAt
                ).toLocaleString()}
                className="muted-text"
              >
                Started{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  {formatDistanceToNow(
                    new Date(
                      incident.startedAt
                    ),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </p>
              {incident.resolvedAt && (
                <p
                  title={new Date(
                    incident.resolvedAt
                  ).toLocaleString()}
                  className="muted-text"
                >
                  Resolved{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {formatDistanceToNow(
                      new Date(
                        incident.resolvedAt
                      ),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                </p>
              )}
              <p className="muted-text">
                Duration{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatDuration(
                    incident.startedAt,
                    incident.resolvedAt
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-auto">
          <p className="text-sm muted-text lg:text-right">
            Reason
          </p>
          <div className="mt-2 rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-3 lg:max-w-sm">
            <p className="wrap-break-word text-sm font-medium text-gray-900 dark:text-white">
              {incident.reason || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;
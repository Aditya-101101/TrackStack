import { formatDistanceToNow } from "date-fns";

const formatDuration = (start, end) => {
  if (!end) return "Ongoing";

  const diff = new Date(end) - new Date(start);
  const mins = Math.floor(diff / 60000);

  if (mins < 60) return `${mins}m`;

  const hrs = Math.floor(mins / 60);

  return `${hrs}h ${mins % 60}m`;
};

const IncidentCard = ({ incident }) => {
  const isOpen = incident.status === "OPEN";

  return (
    <div
      className={`
        card card-padding border-l-4
        ${isOpen ? "border-red-500" : "border-green-500"}
      `}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}
        <div className="flex items-start gap-4">

          {/* STATUS DOT */}
          <div className="relative mt-1.5 shrink-0">
            <div
              className={`
                h-3 w-3 rounded-full
                ${isOpen ? "bg-red-500" : "bg-green-500"}
              `}
            />

            {isOpen && (
              <div className="absolute inset-0 animate-ping rounded-full bg-red-400" />
            )}
          </div>

          {/* INFO */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">

              <h2 className="card-title wrap-break-word">
                {incident.monitorId?.name || "Unknown Monitor"}
              </h2>

              <span
                className={`
      status-badge
      ${isOpen ? "status-badge-down" : "status-badge-up"}
    `}
              >
                {incident.status}
              </span>
            </div>

            <p className="mt-1 break-all text-sm muted-text">
              {incident.monitorId?.url}
            </p>

            <div className="mt-4 space-y-1.5 text-sm">
              <p className="muted-text">
                Started{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  {formatDistanceToNow(new Date(incident.startedAt), {
                    addSuffix: true,
                  })}
                </span>
              </p>

              {incident.resolvedAt && (
                <p className="muted-text">
                  Resolved{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {formatDistanceToNow(new Date(incident.resolvedAt), {
                      addSuffix: true,
                    })}
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
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <div className="text-sm lg:text-right">
            <p className="muted-text">Incident ID</p>

            <p className="font-medium text-gray-900 dark:text-white">
              {incident._id.slice(-6)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;
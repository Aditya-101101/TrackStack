import { formatDistanceToNow } from "date-fns";

const formatDuration = (start, end) => {
  if (!end) return "Ongoing";

  const diff = new Date(end) - new Date(start);

  const mins = Math.floor(diff / 60000);

  if (mins < 60) {
    return `${mins}m`;
  }

  const hrs = Math.floor(mins / 60);

  return `${hrs}h ${mins % 60}m`;
};

const IncidentCard = ({ incident }) => {
  return (
    <div
      className={`
        bg-white rounded-2xl p-5 shadow-sm border-l-4
        ${
          incident.status === "OPEN"
            ? "border-red-500"
            : "border-green-500"
        }
      `}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        {/* LEFT */}
        <div className="flex items-start gap-4">
          
          {/* STATUS DOT */}
          <div className="relative mt-1">
            <div
              className={`
                w-3 h-3 rounded-full
                ${
                  incident.status === "OPEN"
                    ? "bg-red-500"
                    : "bg-green-500"
                }
              `}
            />

            {incident.status === "OPEN" && (
              <div className="absolute inset-0 animate-ping bg-red-400 rounded-full" />
            )}
          </div>

          {/* INFO */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {incident.monitorId?.name || "Unknown Monitor"}
            </h2>

            <p className="text-sm text-gray-500 mt-1 break-all">
              {incident.monitorId?.url}
            </p>

            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-500">
                Started{" "}
                {formatDistanceToNow(
                  new Date(incident.startedAt),
                  { addSuffix: true }
                )}
              </p>

              {incident.resolvedAt && (
                <p className="text-sm text-gray-500">
                  Resolved{" "}
                  {formatDistanceToNow(
                    new Date(incident.resolvedAt),
                    { addSuffix: true }
                  )}
                </p>
              )}

              <p className="text-sm text-gray-500">
                Duration:{" "}
                <span className="font-medium text-gray-700">
                  {formatDuration(
                    incident.startedAt,
                    incident.resolvedAt
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>

    
        <div className="flex flex-col items-start lg:items-end gap-3">
          
        
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-semibold
              ${
                incident.status === "OPEN"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }
            `}
          >
            {incident.status}
          </span>

          {/* OPTIONAL EXTRA INFO */}
          <div className="text-sm text-gray-500 text-left lg:text-right">
            <p>
              Incident ID
            </p>

            <p className="font-medium text-gray-700">
              {incident._id.slice(-6)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;
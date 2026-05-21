function MonitorStatusBadge({ status }) {
  const normalizedStatus = status?.toUpperCase();

  const styles = {
    UP: "bg-green-100 text-green-700 border-green-200",
    DOWN: "bg-red-100 text-red-700 border-red-200",
    UNKNOWN: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[normalizedStatus] || styles.UNKNOWN
      }`}
    >
      {normalizedStatus || "UNKNOWN"}
    </span>
  );
}

export default MonitorStatusBadge;
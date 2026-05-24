function MonitorStatusBadge({ status }) {
  const normalizedStatus = status?.toUpperCase();

  const badgeClass = {
    UP: "status-badge status-badge-up",
    DOWN: "status-badge status-badge-down",
    PAUSED: "status-badge status-badge-paused",
    UNKNOWN: "status-badge status-badge-unknown",
  };

  return (
    <span className={badgeClass[normalizedStatus] || badgeClass.UNKNOWN}>
      {normalizedStatus || "UNKNOWN"}
    </span>
  );
}

export default MonitorStatusBadge;

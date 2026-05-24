import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ResponseTimeChart = ({ data }) => {

  const formattedData = data.map((check) => ({
    time: new Date(
      check.checkedAt || check.createdAt
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),

    responseTime: check.responseTime,
  }));

  return (
    <div className="card card-padding transition-colors">
      <div className="mb-6">
        <h2 className="section-title">
          Response Time
        </h2>

        <p className="muted-text text-sm mt-1">
          Last 24 hours performance metrics
        </p>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={formattedData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            opacity={0.2}
          />

          <XAxis
            dataKey="time"
            tick={{
              fill: "#9CA3AF",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{
              fill: "#9CA3AF",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="responseTime"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponseTimeChart;
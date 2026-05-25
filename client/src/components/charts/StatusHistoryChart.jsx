import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const StatusHistoryChart = ({ data }) => {
  const formattedData = data.map((check) => ({
    time: new Date(check.checkedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    statusValue: check.status === "UP" ? 1 : 0,
    status: check.status,
  }));

  return (
    <div className="card card-padding mt-8">
      
      <div className="mb-6">
        <h2 className="card-title">
          Status History
        </h2>

        <p className="mt-1 text-sm muted-text">
          Uptime status over the last 24 hours
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={formattedData}>
          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(156 163 175 / 0.15)"
          />

          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          <YAxis
            ticks={[0, 1]}
            domain={[0, 1]}
            tickFormatter={(value) =>
              value === 1 ? "UP" : "DOWN"
            }
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "12px",
              color: "#fff",
            }}
            formatter={(value, name, props) => [
              props.payload.status,
              "Status",
            ]}
          />

          <Area
            type="monotone"
            dataKey="statusValue"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusHistoryChart;
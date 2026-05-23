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
    time: new Date(check.checkedAt).toLocaleTimeString(),
    statusValue: check.status === "UP" ? 1 : 0,
    status: check.status,
  }));

  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-8">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Status History (Last 24h)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={formattedData}>
          
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis
            ticks={[0, 1]}
            domain={[0, 1]}
          />

          <Tooltip
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
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusHistoryChart;
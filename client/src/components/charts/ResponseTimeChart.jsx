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
    ).toLocaleTimeString(),
    responseTime: check.responseTime,
  }));

  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-8">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Response Time (Last 24h)
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={formattedData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="responseTime"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponseTimeChart;
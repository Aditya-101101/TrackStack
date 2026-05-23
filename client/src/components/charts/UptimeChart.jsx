import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const UptimeChart = ({ upChecks, downChecks }) => {
  const data = [
    {
      name: "UP",
      value: upChecks,
    },
    {
      name: "DOWN",
      value: downChecks,
    },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-8">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Uptime Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UptimeChart;
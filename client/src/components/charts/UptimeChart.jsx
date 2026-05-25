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

  const totalChecks = upChecks + downChecks;

  const uptimePercentage =
    totalChecks > 0
      ? ((upChecks / totalChecks) * 100).toFixed(2)
      : 0;

  return (
    <div className="card card-padding mt-8">
      
      <div className="mb-6 flex items-start justify-between gap-4">
        
        <div>
          <h2 className="card-title">
            Uptime Distribution
          </h2>

          <p className="mt-1 text-sm muted-text">
            Availability breakdown for recent checks
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {uptimePercentage}%
          </p>

          <p className="text-sm muted-text">
            uptime
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={75}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px",
              color: "#6b7280",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UptimeChart;
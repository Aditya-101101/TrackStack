import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIncidents } from "../../features/incidents/incidentSlice";

const Incidents = () => {
  const dispatch = useDispatch();

  const { incidents, loading, error } = useSelector(
    (state) => state.incidents
  );

  useEffect(() => {
    dispatch(fetchIncidents());
  }, [dispatch]);

  console.log(incidents);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Incidents
      </h1>

      {loading ? (
        <p>Loading incidents...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Monitor</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Started At</th>
                <th className="p-3 text-left">Resolved At</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((incident) => (
                <tr
                  key={incident._id}
                  className="border-t border-gray-700"
                >
                  <td className="p-3">
                    {incident.monitorId?.name || "Unknown"}
                  </td>
                
                  <td className="p-3">
                    <span
                      className={`font-semibold ${incident.status === "OPEN"
                          ? "text-red-500"
                          : "text-green-500"
                        }`}
                    >
                      {incident.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(
                      incident.startedAt || incident.createdAt
                    ).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {incident.resolvedAt
                      ? new Date(
                        incident.resolvedAt
                      ).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Incidents;
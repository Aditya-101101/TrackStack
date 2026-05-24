import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IncidentCard from "../../components/incident/IncidentCard.jsx";

import { fetchIncidents } from "../../features/incidents/incidentSlice.js";

const Incidents = () => {
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const { incidents, loading, error } = useSelector(
    (state) => state.incidents
  );

  const INTERVAL=10*60*1000; // 10 mins
  
  useEffect(() => {
    dispatch(fetchIncidents());

    const interval = setInterval(() => {
      dispatch(fetchIncidents());
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  const totalIncidents = incidents.length;

  const openIncidents = incidents.filter(
    (incident) => incident.status === "OPEN"
  ).length;

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "RESOLVED"
  ).length;

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : incident.status === statusFilter;

      const matchesSearch = incident.monitorId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [incidents, statusFilter, search]);

  return (
    <div className="p-6 space-y-6">

    
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Incidents
        </h1>

        <p className="text-gray-500 mt-1">
          Operational incidents and outage history
        </p>
      </div>

     
      {loading && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500">
            Loading incidents...
          </p>
        </div>
      )}

      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="text-red-500 font-medium">
            {error}
          </p>
        </div>
      )}

     
      {!loading && !error && (
        <>
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-white rounded-2xl border-l-4 border-red-500 p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Open Incidents
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                {openIncidents}
              </h2>
            </div>

            <div className="bg-white rounded-2xl border-l-4 border-green-500 p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Resolved Incidents
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                {resolvedIncidents}
              </h2>
            </div>

            <div className="bg-white rounded-2xl border-l-4 border-blue-500 p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Incidents
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                {totalIncidents}
              </h2>
            </div>

          </div>

          
          <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search monitor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 flex-1 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All</option>
              <option value="OPEN">Open</option>
              <option value="RESOLVED">Resolved</option>
            </select>

          </div>

          {/* EMPTY STATE */}
          {filteredIncidents.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No incidents detected 🎉
              </h2>

              <p className="text-gray-500">
                Your infrastructure is operating normally.
              </p>
            </div>
          )}

          <div className="space-y-4">

            {filteredIncidents.map((incident) => (
              <IncidentCard
                key={incident._id}
                incident={incident}
              />
            ))}

          </div>
        </>
      )}
    </div>
  );
};

export default Incidents;
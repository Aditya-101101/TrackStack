import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IncidentCard from "../../components/incident/IncidentCard.jsx";

import { fetchIncidents } from "../../features/incidents/incidentSlice.js";
import IncidentSkeleton from "../../components/skeletons/IncidentSkeleton.jsx";

const Incidents = () => {
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const { incidents, loading, error } = useSelector(
    (state) => state.incidents
  );

  const INTERVAL = 10 * 60 * 1000;

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
    <div className="page-main space-y-6">


      <div>
        <h1 className="page-title">Incidents</h1>

        <p className="mt-1 muted-text">
          Operational incidents and outage history
        </p>
      </div>


      {loading && <IncidentSkeleton />}

      {error && (
        <div className="alert-error">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>

          {/* STATS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <div className="card card-padding border-l-4 border-red-500">
              <p className="stat-label">Open Incidents</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {openIncidents}
              </h2>
            </div>

            <div className="card card-padding border-l-4 border-green-500">
              <p className="stat-label">Resolved Incidents</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {resolvedIncidents}
              </h2>
            </div>

            <div className="card card-padding border-l-4 border-blue-500">
              <p className="stat-label">Total Incidents</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {totalIncidents}
              </h2>
            </div>
          </div>

        
          <div className="card flex flex-col gap-4 p-4 md:flex-row">

            <input
              type="text"
              placeholder="Search monitor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                flex-1 rounded-xl border border-gray-200
                bg-white px-4 py-3 text-sm
                text-gray-900 outline-none transition-colors
                placeholder:text-gray-400
                focus:border-blue-500
                dark:border-gray-800 dark:bg-gray-950
                dark:text-white dark:placeholder:text-gray-500
              "
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
                rounded-xl border border-gray-200
                bg-white px-4 py-3 text-sm
                text-gray-900 outline-none transition-colors
                focus:border-blue-500
                dark:border-gray-800 dark:bg-gray-950
                dark:text-white
              "
            >
              <option value="ALL">All</option>
              <option value="OPEN">Open</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

        
          {filteredIncidents.length === 0 && (
            <div className="card p-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                No incidents detected 🎉
              </h2>

              <p className="mt-2 muted-text">
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
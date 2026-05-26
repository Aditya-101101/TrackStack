import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMonitors } from "../../features/monitors/monitorSlice.js";
import MonitorCard from "../../components/monitor/MonitorCard.jsx";
import MonitorCardSkeleton from "../../components/skeletons/MonitorCardSkeleton.jsx";
import  Skeleton  from "../../components/ui/Skeleton.jsx";

function Monitors() {
  // console.log("monitors page loaded")
  const dispatch = useDispatch();

  const { monitors, loading, error } = useSelector((state) => state.monitors);

  useEffect(() => {
    dispatch(fetchMonitors());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="page-main space-y-8">


        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          <div className="space-y-3">
            <Skeleton className="h-10 w-52" />
            <Skeleton className="h-5 w-80" />
          </div>

          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>


        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <MonitorCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Monitors</h1>
          <p className="text-gray-600 mt-1">
            Manage all websites and APIs you are monitoring.
          </p>
        </div>

        <Link
          to="/monitors/create"
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={18} />
          New Monitor
        </Link>
      </div>

      {monitors.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <h2 className="text-lg font-semibold">No monitors yet</h2>
          <p className="text-gray-500 mt-2">
            Create your first monitor to start tracking uptime.
          </p>

          <Link
            to="/monitors/create"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium mt-5"
          >
            <Plus size={18} />
            Create Monitor
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {monitors.map((monitor) => (
            <MonitorCard key={monitor._id} monitor={monitor} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Monitors;
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Plus } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { fetchMonitors } from "../../features/monitors/monitorSlice.js";

import MonitorCard from "../../components/monitor/MonitorCard.jsx";
import MonitorCardSkeleton from "../../components/skeletons/MonitorCardSkeleton.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";

function Monitors() {
  const dispatch = useDispatch();

  const {
    monitors,
    loading,
    error,
  } = useSelector(
    (state) => state.monitors
  );

  useEffect(() => {
    dispatch(fetchMonitors());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="page-main space-y-8">


        <div
          className="
            flex flex-col gap-4
            md:flex-row md:items-start
            md:justify-between
          "
        >
          <div className="space-y-3">
            <Skeleton className="h-10 w-52" />

            <Skeleton className="h-5 w-80" />
          </div>

          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>


        <div
          className="
            grid grid-cols-1 gap-6
            lg:grid-cols-2 xl:grid-cols-3
          "
        >
          {[...Array(6)].map(
            (_, i) => (
              <MonitorCardSkeleton
                key={i}
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-2xl border
          border-red-200
          bg-red-50
          px-4 py-3
          text-red-700
          dark:border-red-900
          dark:bg-red-950/30
          dark:text-red-400
        "
      >
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">


      <div
        className="
          flex flex-col gap-4
          md:flex-row md:items-center
          md:justify-between
        "
      >
        <div>
          <h1 className="page-title">
            Monitors
          </h1>

          <p className="mt-1 muted-text">
            Manage all websites and APIs
            you are monitoring.
          </p>
        </div>

        <Link
          to="/monitors/create"
          className="
            inline-flex items-center
            gap-2 rounded-xl
            bg-black px-4 py-3
            text-sm font-medium
            text-white transition-colors
            hover:bg-gray-800
            dark:bg-white
            dark:text-black
            dark:hover:bg-gray-200
          "
        >
          <Plus size={18} />

          New Monitor
        </Link>
      </div>

      {monitors.length === 0 ? (
        <div
          className="
            card rounded-2xl
            p-10 text-center
          "
        >
          <h2
            className="
              text-lg font-semibold
              text-gray-900
              dark:text-white
            "
          >
            No monitors yet
          </h2>

          <p className="mt-2 muted-text">
            Create your first monitor to
            start tracking uptime.
          </p>

          <Link
            to="/monitors/create"
            className="
              mt-6 inline-flex
              items-center gap-2
              rounded-xl bg-black
              px-4 py-3 text-sm
              font-medium text-white
              transition-colors
              hover:bg-gray-800
              dark:bg-white
              dark:text-black
              dark:hover:bg-gray-200
            "
          >
            <Plus size={18} />

            Create Monitor
          </Link>
        </div>
      ) : (
        <div
          className="
            grid gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {monitors.map(
            (monitor) => (
              <MonitorCard
                key={monitor._id}
                monitor={monitor}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Monitors;
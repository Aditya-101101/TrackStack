import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import MonitorForm from "../../components/monitor/MonitorForm.jsx";

import {
  fetchMonitorById,
  updateMonitor,
} from "../../features/monitors/monitorSlice.js";

import MonitorDetailsSkeleton from "../../components/skeletons/MonitorDetailsSkeleton.jsx";

const EditMonitor = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    selectedMonitor,
    loading,
    error,
  } = useSelector(
    (state) => state.monitors
  );

  useEffect(() => {
    dispatch(fetchMonitorById(id));
  }, [dispatch, id]);

  const handleUpdateMonitor =
    async (formData) => {
      const result = await dispatch(
        updateMonitor({
          id,
          monitorData: formData,
        })
      );

      if (
        updateMonitor.fulfilled.match(
          result
        )
      ) {
        navigate(`/monitors/${id}`);
      }
    };

  if (loading && !selectedMonitor) {
    return (
      <MonitorDetailsSkeleton />
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

  if (!selectedMonitor) {
    return (
      <div className="muted-text">
        Monitor not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">

      <div>
        
        <Link
          to={`/monitors/${id}`}
          className="
            mb-4 inline-flex
            items-center gap-2
            text-sm muted-text
            transition-colors
            hover:text-gray-900
            dark:hover:text-white
          "
        >
          <ArrowLeft size={16} />

          Back to Monitor Details
        </Link>

        <h1 className="page-title">
          Edit Monitor
        </h1>

        <p className="mt-1 muted-text">
          Update monitor configuration.
        </p>
      </div>

      <MonitorForm
        initialData={selectedMonitor}
        onSubmit={handleUpdateMonitor}
        loading={loading}
        submitLabel="Update Monitor"
      />
    </div>
  );
};
export default EditMonitor;
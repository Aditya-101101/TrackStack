import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import MonitorForm from "../../components/monitor/MonitorForm.jsx";
import {
  fetchMonitorById,
  updateMonitor,
} from "../../features/monitors/monitorSlice.js";

const EditMonitor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedMonitor, loading, error } = useSelector(
    (state) => state.monitors
  );

  useEffect(() => {
    dispatch(fetchMonitorById(id));
  }, [dispatch, id]);

  const handleUpdateMonitor = async (formData) => {
    const result = await dispatch(
      updateMonitor({
        id,
        monitorData: formData,
      })
    );

    // console.log("UPDATE DISPATCH RESULT:", result);

    if (updateMonitor.fulfilled.match(result)) {
      navigate(`/monitors/${id}`);
    }
  };

  if (loading && !selectedMonitor) {
    return <p className="text-gray-500">Loading monitor...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!selectedMonitor) {
    return <div className="text-gray-500">Monitor not found.</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to={`/monitors/${id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Monitor Details
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">Edit Monitor</h1>
        <p className="text-gray-500 mt-1">
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
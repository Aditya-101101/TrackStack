import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MonitorForm from "../../components/monitor/MonitorForm.jsx";
import { createMonitor } from "../../features/monitors/monitorSlice.js";

const CreateMonitor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.monitors);

  const handleCreateMonitor = async (formData) => {
    // console.log("CREATE PAGE RECEIVED:", formData);

    const result = await dispatch(createMonitor(formData));

    // console.log("CREATE DISPATCH RESULT:", result);

    if (createMonitor.fulfilled.match(result)) {
      navigate("/monitors");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/monitors"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Monitors
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">Create Monitor</h1>
        <p className="text-gray-500 mt-1">
          Add a new URL to start monitoring uptime.
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg max-w-2xl">
          {error}
        </div>
      )}

      <MonitorForm
        onSubmit={handleCreateMonitor}
        loading={loading}
        submitLabel="Create Monitor"
      />
    </div>
  );
};

export default CreateMonitor;
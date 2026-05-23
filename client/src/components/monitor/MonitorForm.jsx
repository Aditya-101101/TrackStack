import { useState, useEffect } from "react";

const MonitorForm = ({
  onSubmit,
  loading,
  initialData = {},
  submitLabel = "Create Monitor",
}) => {


  const [formData, setFormData] = useState({
    name: initialData.name || "",
    url: initialData.url || "",
    method: initialData.method || "GET",
    interval: initialData.interval || 60,
    timeout: initialData.timeout || 10000,
  });

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      name: initialData.name || "",
      url: initialData.url || "",
      method: initialData.method || "GET",
      interval: initialData.interval || 60,
      timeout: initialData.timeout || 10000,
    });
  }, [
    initialData?.name,
    initialData?.url,
    initialData?.method,
    initialData?.interval,
    initialData?.timeout,
  ]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.name.trim()) {
      setLocalError("Monitor name is required");
      return;
    }

    if (!formData.url.trim()) {
      setLocalError("URL is required");
      return;
    }

    if (
      !formData.url.startsWith("http://") &&
      !formData.url.startsWith("https://")
    ) {
      setLocalError("URL must start with http:// or https://");
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      url: formData.url.trim(),
      method: formData.method,
      interval: Number(formData.interval),
      timeout: Number(formData.timeout),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-2xl"
    >
      {localError && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg text-sm">
          {localError}
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monitor Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Example: My Portfolio"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL
        </label>
        <input
          type="text"
          name="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Method
          </label>
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="HEAD">HEAD</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check Interval
          </label>
          <select
            name="interval"
            value={formData.interval}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={60}>Every 1 minute</option>
            <option value={300}>Every 5 minutes</option>
            <option value={600}>Every 10 minutes</option>
            <option value={1800}>Every 30 minutes</option>
            <option value={3600}>Every 1 hour</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Timeout
        </label>
        <select
          name="timeout"
          value={formData.timeout}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5000}>5 seconds</option>
          <option value={10000}>10 seconds</option>
          <option value={15000}>15 seconds</option>
          <option value={30000}>30 seconds</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default MonitorForm;
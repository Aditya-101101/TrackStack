import { useState, useEffect } from "react";

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400";

const labelClass =
  "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300";

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

  const [localError, setLocalError] =
    useState("");

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      name: initialData.name || "",
      url: initialData.url || "",
      method:
        initialData.method || "GET",
      interval:
        initialData.interval || 60,
      timeout:
        initialData.timeout || 10000,
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
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLocalError("");

    if (!formData.name.trim()) {
      setLocalError(
        "Monitor name is required"
      );
      return;
    }

    if (!formData.url.trim()) {
      setLocalError(
        "URL is required"
      );
      return;
    }

    if (
      !formData.url.startsWith(
        "http://"
      ) &&
      !formData.url.startsWith(
        "https://"
      )
    ) {
      setLocalError(
        "URL must start with http:// or https://"
      );
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      url: formData.url.trim(),
      method: formData.method,
      interval: Number(
        formData.interval
      ),
      timeout: Number(
        formData.timeout
      ),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        card max-w-2xl
        rounded-2xl p-6
      "
    >
      {localError && (
        <div
          className="
            mb-5 rounded-xl
            border border-red-200
            bg-red-50 px-4 py-3
            text-sm text-red-700
            dark:border-red-900
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          {localError}
        </div>
      )}

      {/* NAME */}
      <div className="mb-5">
        <label className={labelClass}>
          Monitor Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Example: My Portfolio"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* URL */}
      <div className="mb-5">
        <label className={labelClass}>
          URL
        </label>

        <input
          type="text"
          name="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        
        {/* METHOD */}
        <div>
          <label className={labelClass}>
            Method
          </label>

          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="GET">
              GET
            </option>

            <option value="POST">
              POST
            </option>

            <option value="HEAD">
              HEAD
            </option>
          </select>
        </div>

        {/* INTERVAL */}
        <div>
          <label className={labelClass}>
            Check Interval
          </label>

          <select
            name="interval"
            value={formData.interval}
            onChange={handleChange}
            className={inputClass}
          >
            <option value={60}>
              Every 1 minute
            </option>

            <option value={300}>
              Every 5 minutes
            </option>

            <option value={600}>
              Every 10 minutes
            </option>

            <option value={1800}>
              Every 30 minutes
            </option>

            <option value={3600}>
              Every 1 hour
            </option>
          </select>
        </div>
      </div>

      {/* TIMEOUT */}
      <div className="mt-5 mb-6">
        <label className={labelClass}>
          Timeout
        </label>

        <select
          name="timeout"
          value={formData.timeout}
          onChange={handleChange}
          className={inputClass}
        >
          <option value={5000}>
            5 seconds
          </option>

          <option value={10000}>
            10 seconds
          </option>

          <option value={15000}>
            15 seconds
          </option>

          <option value={30000}>
            30 seconds
          </option>
        </select>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="
          rounded-xl bg-blue-600
          px-5 py-3 text-sm
          font-medium text-white
          transition hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading
          ? "Saving..."
          : submitLabel}
      </button>
    </form>
  );
};

export default MonitorForm;
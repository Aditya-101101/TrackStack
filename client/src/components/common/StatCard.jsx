function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>

          {subtitle && (
            <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
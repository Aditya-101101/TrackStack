function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="card card-padding">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm muted-text">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
            {value}
          </h3>

          {subtitle && (
            <p className="text-sm muted-text mt-2">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-700 dark:text-gray-300">
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
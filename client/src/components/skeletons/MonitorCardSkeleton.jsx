import Skeleton from "../ui/Skeleton.jsx";

const MonitorCardSkeleton = () => {
  return (
    <div className="card card-padding">
      
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        
        <div className="flex items-start gap-4">
          <Skeleton className="mt-1 h-6 w-6 rounded-full" />

          <div className="space-y-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        <Skeleton className="h-8 w-14 rounded-full" />
      </div>

      {/* STATS */}
      <div className="mt-10 grid grid-cols-2 gap-y-8">
        
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-7 w-24" />
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        
        <Skeleton className="h-8 w-24 rounded-full" />

        <Skeleton className="h-6 w-28" />
      </div>
    </div>
  );
};

export default MonitorCardSkeleton;
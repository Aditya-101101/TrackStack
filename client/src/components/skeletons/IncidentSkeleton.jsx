import Skeleton from "../ui/Skeleton.jsx";

const StatCardSkeleton = () => (
  <div className="card p-6 space-y-4">
    <Skeleton className="h-5 w-32" />
    <Skeleton className="h-10 w-16" />
  </div>
);

const IncidentCardSkeleton = () => (
  <div className="card border-l-4 border-gray-300 p-6 dark:border-gray-700">
    
    <div className="flex items-start justify-between gap-6">
      
      {/* LEFT */}
      <div className="flex items-start gap-4">
        
        <Skeleton className="mt-2 h-4 w-4 rounded-full" />

        <div className="space-y-4">
          
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          <Skeleton className="h-5 w-72" />

          <div className="space-y-3 pt-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-3 text-right">
        <Skeleton className="ml-auto h-5 w-24" />
        <Skeleton className="ml-auto h-6 w-16" />
      </div>
    </div>
  </div>
);

const IncidentsSkeleton = () => {
  return (
    <div className="page-main space-y-8">
      
      {/* HEADER */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* FILTERS */}
      <div className="card flex flex-col gap-4 p-5 md:flex-row">
        
        <Skeleton className="h-14 flex-1 rounded-xl" />

        <Skeleton className="h-14 w-40 rounded-xl" />
      </div>

      {/* INCIDENTS */}
      <div className="space-y-5">
        {[...Array(4)].map((_, i) => (
          <IncidentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default IncidentsSkeleton;
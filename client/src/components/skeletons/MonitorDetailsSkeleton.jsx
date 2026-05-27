import Skeleton from "../ui/Skeleton.jsx";

const MetricBoxSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
    <Skeleton className="h-5 w-24" />
    <Skeleton className="mt-4 h-8 w-28" />
  </div>
);

const MonitorDetailsSkeleton = () => {
  return (
    <div className="page-main space-y-8">
      
     
      <Skeleton className="h-6 w-40" />

      <div className="card card-padding space-y-8">

        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          
          <div className="space-y-4">
            
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>

            <Skeleton className="h-5 w-80" />
          </div>

  
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-12 w-44 rounded-xl" />
            <Skeleton className="h-12 w-28 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
          </div>
        </div>

        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          
          {[...Array(8)].map((_, i) => (
            <MetricBoxSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <MetricBoxSkeleton key={i} />
          ))}
        </div>
      </div>

    
      <div className="space-y-6">
        
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="card card-padding space-y-5"
          >
            <div className="space-y-2">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-5 w-72" />
            </div>

            <Skeleton className="h-65 w-full rounded-2xl" />
          </div>
        ))}
      </div>

      <div className="card card-padding space-y-5">
        
        <Skeleton className="h-8 w-48" />

        <div className="space-y-3">
          
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-800"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>

              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitorDetailsSkeleton;
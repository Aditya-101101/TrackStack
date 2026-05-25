import Skeleton from "../ui/Skeleton";

const StatCardSkeleton = () => (
  <div className="card card-padding space-y-4">
    
    <div className="flex items-start justify-between">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>

    <Skeleton className="h-10 w-16" />

    <Skeleton className="h-4 w-32" />
  </div>
);

const DashboardSkeleton = () => {
  return (
    <div className="page-main space-y-8">
     
      <div className="space-y-3">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-5 w-80" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      
      <div className="space-y-4">
        <Skeleton className="h-10 w-56" />

        <div className="card card-padding">
          <Skeleton className="h-6 w-64" />
        </div>
      </div>

      
      <div className="card card-padding space-y-6">
        
        <div className="space-y-3">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-5 w-72" />
        </div>

        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
import Skeleton from "../ui/Skeleton.jsx";

const MonitorCardSkeleton = () => {
  return (
    <div className="card card-padding">
      
      {/* HEADER */}
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-start
          sm:justify-between
        "
      >
        <div className="flex min-w-0 items-start gap-4">
          
          <Skeleton
            className="
              mt-1 h-6 w-6
              shrink-0 rounded-full
            "
          />

          <div className="min-w-0 flex-1 space-y-3">
            <Skeleton className="h-7 w-32 sm:w-40" />

            <Skeleton
              className="
                h-5 w-full
                max-w-55
                sm:max-w-65
              "
            />
          </div>
        </div>

        <Skeleton
          className="
            h-8 w-16
            rounded-full
            self-start
          "
        />
      </div>

      {/* STATS */}
      <div
        className="
          mt-8 grid
          grid-cols-1 gap-6
          sm:grid-cols-2
        "
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="space-y-3"
          >
            <Skeleton className="h-4 w-20" />

            <Skeleton className="h-7 w-24" />
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div
        className="
          mt-8 flex flex-col
          gap-4 border-t
          border-gray-200 pt-6
          dark:border-gray-800
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <Skeleton
          className="
            h-8 w-24
            rounded-full
          "
        />

        <Skeleton className="h-6 w-28" />
      </div>
    </div>
  );
};

export default MonitorCardSkeleton;
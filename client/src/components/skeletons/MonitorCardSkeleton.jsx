import Skeleton from "../ui/Skeleton.jsx";

const MonitorCardSkeleton = () => {
  return (
    <div className="card card-padding overflow-hidden">


      <div
        className="
          flex flex-col gap-4
          lg:flex-row lg:items-start
          lg:justify-between
        "
      >

        <div className="flex min-w-0 flex-1 items-start gap-4">

          {/* STATUS DOT */}
          <Skeleton
            className="
              mt-1 h-5 w-5
              shrink-0 rounded-full
            "
          />


          <div className="min-w-0 flex-1 space-y-3">

            <Skeleton
              className="
                h-7 w-36
                sm:w-44
              "
            />

            <Skeleton
              className="
                h-5 w-full
                max-w-45
                sm:max-w-65
                md:max-w-[320px]
              "
            />
          </div>
        </div>

        <Skeleton
          className="
            h-8 w-16
            shrink-0 rounded-full
            self-start
          "
        />
      </div>


      <div
        className="
          mt-8 grid
          grid-cols-2 gap-x-6
          gap-y-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="
              min-w-0 space-y-2
            "
          >
            <Skeleton className="h-4 w-20" />

            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>


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

        <Skeleton
          className="
            h-5 w-28
            sm:w-32
          "
        />
      </div>
    </div>
  );
};

export default MonitorCardSkeleton;
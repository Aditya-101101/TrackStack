import Skeleton from "../ui/Skeleton.jsx";

const MonitorCardSkeleton = () => {
  return (
    <div
      className="
        card card-padding
        w-full overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-start
          justify-between gap-4
        "
      >
        {/* LEFT */}
        <div
          className="
            flex min-w-0
            flex-1 items-start gap-4
          "
        >
          {/* STATUS DOT */}
          <Skeleton
            className="
              mt-1 h-5 w-5
              shrink-0 rounded-full
            "
          />

          {/* TITLE + URL */}
          <div
            className="
              flex min-w-0
              flex-1 flex-col
              gap-3 overflow-hidden
            "
          >
            <Skeleton
              className="
                h-7 w-32
                sm:w-40
              "
            />

            <Skeleton
              className="
                h-4 w-full
              "
            />
          </div>
        </div>

        {/* BADGE */}
        <Skeleton
          className="
            h-8 w-16
            shrink-0 rounded-full
          "
        />
      </div>

      {/* STATS */}
      <div
        className="
          mt-8 grid
          grid-cols-2 gap-6
        "
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="
              flex min-w-0
              flex-col gap-2
            "
          >
            <Skeleton className="h-4 w-20" />

            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div
        className="
          mt-8 flex items-center
          justify-between gap-4
          border-t border-gray-200
          pt-6 dark:border-gray-800
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
            h-5 w-24
            shrink-0
          "
        />
      </div>
    </div>
  );
};

export default MonitorCardSkeleton;
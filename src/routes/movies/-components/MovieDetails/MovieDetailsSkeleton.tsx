export function MovieDetailsSkeleton() {
  return (
    <div className="w-2xs sm:w-lg">
      <div className="animate-pulse">
        <div className="mb-6 h-14 w-2/3 rounded bg-gray-300"></div>
        <div className="flex flex-col gap-2">
          <div className="gap- flex flex-col gap-4">
            <div className="h-4 w-1/6 rounded bg-gray-200"></div>
            <div className="h-4 w-1/3 rounded bg-gray-200"></div>
            <div className="h-4 w-1/3 rounded bg-gray-200"></div>
            <div className="flex flex-col gap-8">
              <div className="h-40 w-3/4 rounded bg-gray-200"></div>
              <div className="h-40 w-3/4 rounded bg-gray-200"></div>
              <div className="h-40 w-3/4 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

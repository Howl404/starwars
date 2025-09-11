export function MovieCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="animate-pulse">
        <div className="mb-2 h-7 w-44 rounded bg-gray-300"></div>
        <div className="flex flex-col gap-2">
          <div className="gap- flex flex-col gap-2">
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-2/5 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

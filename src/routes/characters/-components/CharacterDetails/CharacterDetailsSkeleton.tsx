export function CharacterDetailsSkeleton() {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
      <div className="animate-pulse">
        <div className="mb-8 h-16 w-1/3 rounded border-b border-gray-100 bg-gray-300 pb-4"></div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="h-19 w-1/10 rounded bg-gray-200"></div>
          <div className="h-19 w-1/11 rounded bg-gray-200"></div>
          <div className="h-19 w-1/8 rounded bg-gray-200"></div>
          <div className="h-19 w-1/9 rounded bg-gray-200"></div>
          <div className="h-19 w-1/11 rounded bg-gray-200"></div>
          <div className="h-19 w-1/8 rounded bg-gray-200"></div>
          <div className="h-19 w-1/8 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

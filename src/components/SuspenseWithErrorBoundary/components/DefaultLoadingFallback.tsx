export function DefaultLoadingFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
}

export function Loader() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-bold">Loading</h2>
      <div className="flex space-x-2">
        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500"></div>
      </div>
    </div>
  );
}

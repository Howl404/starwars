export function CharacterCardSkeleton() {
  return (
    <div
      data-testid="character-card-skeleton"
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="animate-pulse">
        <div className="mb-2 h-7 rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
}

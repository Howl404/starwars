import { CharacterCardSkeleton } from '@/components/CharacterCard';

export function MovieCharactersSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </div>
  );
}

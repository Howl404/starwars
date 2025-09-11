import { MovieCardSkeleton } from '@/components/MovieCard';

export function CharacterMoviesSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

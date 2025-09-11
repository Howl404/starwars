import { MovieCardSkeleton, MovieCard } from '@/components/MovieCard';
import { useCharacter } from '@/hooks/useCharacter';
import { getIdFromUrl } from '@/utils/getIdFromUrl';
import { Suspense } from 'react';

export function CharacterMovies({ characterId }: { characterId: string }) {
  const { data: character } = useCharacter(characterId);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {character.films.map((url) => (
        <Suspense key={url} fallback={<MovieCardSkeleton />}>
          <MovieCard movieId={getIdFromUrl(url)} />
        </Suspense>
      ))}
    </div>
  );
}

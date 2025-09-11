import {
  CharacterCard,
  CharacterCardSkeleton,
} from '@/components/CharacterCard';
import { SuspenseWithErrorBoundary } from '@/components/SuspenseWithErrorBoundary/SuspenseWithErrorBoundary';
import { useMovie } from '@/hooks/useMovie';
import { getIdFromUrl } from '@/utils/getIdFromUrl';

export function MovieCharacters({ movieId }: { movieId: string }) {
  const { data: movie } = useMovie(movieId);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movie.characters.map((characterUrl) => (
        <SuspenseWithErrorBoundary
          key={characterUrl}
          fallback={<CharacterCardSkeleton />}
        >
          <CharacterCard characterId={getIdFromUrl(characterUrl)} />
        </SuspenseWithErrorBoundary>
      ))}
    </div>
  );
}

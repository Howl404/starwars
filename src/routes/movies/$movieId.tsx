import {
  CharacterCard,
  CharacterCardSkeleton,
} from './-components/CharacterCard';
import { MovieDetails, MovieDetailsSkeleton } from './-components/MovieDetails';

import { createFileRoute } from '@tanstack/react-router';
import { useMovie } from '@/routes/movies/-hooks/useMovie';
import { Suspense } from 'react';

export const Route = createFileRoute('/movies/$movieId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const { data: movie, isLoading: isMovieLoading } = useMovie(movieId);

  return (
    <div className="flex flex-col justify-around gap-4 md:gap-8 lg:flex-row lg:gap-16">
      {isMovieLoading && (
        <>
          <MovieDetailsSkeleton />
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 36 }).map((_, index) => (
              <CharacterCardSkeleton key={index} />
            ))}
          </div>
        </>
      )}

      {movie && (
        <>
          <MovieDetails {...movie} />
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movie.characters.map((characterUrl) => (
              <Suspense key={characterUrl} fallback={<CharacterCardSkeleton />}>
                <CharacterCard characterUrl={characterUrl} />
              </Suspense>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

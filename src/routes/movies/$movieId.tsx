import {
  CharacterCard,
  CharacterCardSkeleton,
} from '@/components/CharacterCard';
import { MovieDetails, MovieDetailsSkeleton } from './-components/MovieDetails';

import { createFileRoute } from '@tanstack/react-router';
import { useMovie } from '@/hooks/useMovie';
import { Suspense } from 'react';
import { Routes } from '@/constants/api';
import { getIdFromUrl } from '@/utils/getIdFromUrl';

export const Route = createFileRoute(`${Routes.MOVIES}/$movieId`)({
  component: MovieDetailPage,
});

function MovieDetailPage() {
  const { movieId } = Route.useParams();

  return (
    <div className="flex flex-1 flex-col justify-around gap-4 p-4 sm:p-6 md:gap-8 lg:flex-row lg:gap-16">
      <Suspense fallback={<MovieDetailsSkeleton />}>
        <MovieDetails movieId={movieId} />
      </Suspense>
      <Suspense fallback={<MovieCharactersSkeleton />}>
        <MovieCharacters movieId={movieId} />
      </Suspense>
    </div>
  );
}

function MovieCharacters({ movieId }: { movieId: string }) {
  const { data: movie } = useMovie(movieId);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movie.characters.map((characterUrl) => (
        <Suspense key={characterUrl} fallback={<CharacterCardSkeleton />}>
          <CharacterCard characterId={getIdFromUrl(characterUrl)} />
        </Suspense>
      ))}
    </div>
  );
}

function MovieCharactersSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </div>
  );
}

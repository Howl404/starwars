import { MovieDetails, MovieDetailsSkeleton } from './-components/MovieDetails';

import { createFileRoute } from '@tanstack/react-router';
import { Routes } from '@/constants/api';
import { MovieCharacters } from '@/routes/movies/-components/MovieCharacters/MovieCharacters';
import { MovieCharactersSkeleton } from '@/routes/movies/-components/MovieCharacters/MovieCharactersSkeleton';
import { SuspenseWithErrorBoundary } from '@/components/SuspenseWithErrorBoundary/SuspenseWithErrorBoundary';

export const Route = createFileRoute(`${Routes.MOVIES}/$movieId`)({
  component: MovieDetailPage,
});

function MovieDetailPage() {
  const { movieId } = Route.useParams();

  return (
    <div className="flex flex-1 flex-col justify-around gap-4 p-4 sm:p-6 md:gap-8 lg:flex-row lg:gap-16">
      <SuspenseWithErrorBoundary fallback={<MovieDetailsSkeleton />}>
        <MovieDetails movieId={movieId} />
      </SuspenseWithErrorBoundary>
      <SuspenseWithErrorBoundary fallback={<MovieCharactersSkeleton />}>
        <MovieCharacters movieId={movieId} />
      </SuspenseWithErrorBoundary>
    </div>
  );
}

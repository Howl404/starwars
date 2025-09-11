import { Routes } from '@/constants/api';
import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { useMovies } from './-hooks/useMovies';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(`${Routes.MOVIES}/`)({
  component: MoviesPage,
});

function MoviesPage() {
  const { data: movies, isLoading: isMoviesLoading } = useMovies();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <h1 className="text-6xl font-bold text-yellow-400">Movies</h1>
      <div
        role="list"
        aria-label="List of movies"
        className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {isMoviesLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        {movies?.map((movie) => (
          <MovieCard key={movie.episode_id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

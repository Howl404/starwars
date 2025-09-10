import { Routes } from '@/constants/api';
import { MovieCardSkeleton } from '@/routes/movies/-components/MovieCard';
import { useMovies } from '@/routes/movies/-hooks/useMovies';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute(`${Routes.MOVIES}/`)({
  component: MoviesPage,
});

function MoviesPage() {
  const { data: movies, isLoading: isMoviesLoading } = useMovies();

  return (
    <div
      role="list"
      aria-label="List of movies"
      className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {isMoviesLoading &&
        Array.from({ length: 6 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      {movies?.map((movie) => (
        <Link
          to={`/movies/$movieId`}
          params={{ movieId: movie.episode_id.toString() }}
          className="rounded border p-4"
          key={movie.episode_id}
        >
          <h2 className="text-lg font-bold">{movie.title}</h2>
          <pre className="whitespace-pre-wrap">
            {movie.opening_crawl.slice(0, 128)}
            {movie.opening_crawl.length > 128 ? '...' : ''}
          </pre>
        </Link>
      ))}
    </div>
  );
}

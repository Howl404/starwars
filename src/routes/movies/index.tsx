import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { Search } from '@/components/Search/Search';
import { Routes } from '@/constants/api';
import type { Movie } from '@/types/Movie';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { useMovies } from './-hooks/useMovies';
import { DefaultErrorFallback } from '@/components/SuspenseWithErrorBoundary/components/DefaultErrorFallback';

export const Route = createFileRoute(`${Routes.MOVIES}/`)({
  component: MoviesPage,
});

function MoviesPage() {
  const {
    data: movies,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
    error: moviesError,
  } = useMovies();

  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const handleSearch = useCallback(
    (query: string) => {
      if (!movies) return;

      const normalizedQuery = query.toLowerCase().trim();

      const result = movies?.filter((movie) =>
        movie.title?.toLowerCase().includes(normalizedQuery)
      );

      setFilteredMovies(result || []);
    },
    [movies]
  );

  useEffect(() => {
    if (movies) {
      setFilteredMovies(movies);
    }
  }, [movies]);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <h1 className="text-6xl font-bold text-yellow-400">Movies</h1>
      <Search
        placeholder="Search for a movie..."
        onSearch={handleSearch}
        debounceDelay={1000}
      />
      <div
        role="list"
        aria-label="List of movies"
        className={`grid flex-1 gap-4 ${
          isMoviesError || (!isMoviesLoading && !filteredMovies.length)
            ? 'grid-cols-1'
            : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {isMoviesLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie.episode_id} movie={movie} />
        ))}
        {!isMoviesLoading && !isMoviesError && !filteredMovies.length && (
          <p className="text-center text-xl text-gray-500">No movies found</p>
        )}
        {isMoviesError && <DefaultErrorFallback error={moviesError} />}
      </div>
    </div>
  );
}

import { useMovie } from '@/hooks/useMovie';
import type { MovieDetailsProps } from '@/routes/movies/-components/MovieDetails/MovieDetails.types';
import type { Movie } from '@/types/Movie';

export function MovieDetails({ movie, movieId }: MovieDetailsProps) {
  if (movie) {
    return <MovieDetailsContent {...movie} />;
  }

  return <MovieDetailsFromUrl movieId={movieId} />;
}

function MovieDetailsContent({
  episode_id,
  title,
  opening_crawl,
  director,
  release_date,
}: Movie) {
  return (
    <div className="w-2xs border-gray-200 bg-white sm:w-lg">
      <h1 className="mb-6 text-5xl font-bold text-gray-900">{title}</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-m font-bold text-gray-600">Episode {episode_id}</h2>
        <h2 className="text-m font-bold text-gray-600">Director: {director}</h2>
        <h2 className="text-m font-bold text-gray-600">
          Release Date: {release_date}
        </h2>
        <pre className="text-gray-600 sm:text-lg">{opening_crawl}</pre>
      </div>
    </div>
  );
}

function MovieDetailsFromUrl({ movieId }: { movieId: string }) {
  const { data: movie } = useMovie(movieId);
  return <MovieDetailsContent {...movie} />;
}

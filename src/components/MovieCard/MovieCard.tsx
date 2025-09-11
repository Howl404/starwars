import type { MovieCardProps } from '@/components/MovieCard/MovieCard.types';
import { Routes } from '@/constants/api';
import { useMovie } from '@/hooks/useMovie';
import type { Movie } from '@/types/Movie';
import { Link } from '@tanstack/react-router';

export function MovieCard({ movie, movieId }: MovieCardProps) {
  if (movie) {
    return <MovieContent {...movie} />;
  }

  return <MovieFromUrl movieId={movieId} />;
}

function MovieContent({ episode_id, title, opening_crawl }: Movie) {
  return (
    <Link
      to={`${Routes.MOVIES}/$movieId`}
      params={{ movieId: episode_id.toString() }}
      className="rounded border p-4"
      key={episode_id}
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <pre className="whitespace-pre md:whitespace-normal">
        {opening_crawl.slice(0, 128)}
        {opening_crawl.length > 128 ? '...' : ''}
      </pre>
    </Link>
  );
}

function MovieFromUrl({ movieId }: { movieId: string }) {
  const { data: movie } = useMovie(movieId);
  return <MovieContent {...movie} />;
}

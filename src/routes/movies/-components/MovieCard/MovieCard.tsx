import type { Movie } from '@/types/Movie';
import { Link } from '@tanstack/react-router';

export function MovieCard({ episode_id, title, opening_crawl }: Movie) {
  return (
    <Link
      to={`/movies/$movieId`}
      params={{ movieId: episode_id.toString() }}
      className="rounded border p-4"
      key={episode_id}
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <pre className="whitespace-pre-wrap">
        {opening_crawl.slice(0, 128)}
        {opening_crawl.length > 128 ? '...' : ''}
      </pre>
    </Link>
  );
}

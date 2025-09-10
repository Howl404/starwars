import type { Movie } from '@/types/Movie';

export function MovieDetails({
  title,
  episode_id,
  director,
  release_date,
  opening_crawl,
}: Movie) {
  return (
    <div className="w-2xs border-gray-200 bg-white sm:w-lg">
      <h2 className="mb-6 text-5xl font-bold text-gray-900">{title}</h2>
      <div className="flex flex-col gap-2">
        <p className="text-m font-bold text-gray-600">Episode {episode_id}</p>
        <p className="text-m font-bold text-gray-600">Director: {director}</p>
        <p className="text-m font-bold text-gray-600">
          Release Date: {release_date}
        </p>
        <pre className="text-gray-600 sm:text-lg">{opening_crawl}</pre>
      </div>
    </div>
  );
}

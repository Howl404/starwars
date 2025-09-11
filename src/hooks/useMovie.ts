import { MOVIES_API_URL } from '@/constants/api';
import type { Movie } from '@/types/Movie';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export function useMovie(movieId: string) {
  const queryClient = useQueryClient();

  return useSuspenseQuery<Movie>({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      const movies = queryClient.getQueryData<Movie[]>(['movies']);
      const cachedMovie = movies?.find((m) => m.episode_id === Number(movieId));

      if (cachedMovie) {
        return cachedMovie;
      }

      const res = await fetch(`${MOVIES_API_URL}/${movieId}`);
      return res.json();
    },
  });
}

import { MOVIES_API_URL } from '@/constants/api';
import type { Movie } from '@/types/Movie';
import { useQuery } from '@tanstack/react-query';

export function useMovies() {
  return useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await fetch(MOVIES_API_URL);
      return res.json();
    },
  });
}

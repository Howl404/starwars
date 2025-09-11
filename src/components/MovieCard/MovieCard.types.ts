import type { Movie } from '@/types/Movie';

export type MovieCardProps =
  | { movieId: string; movie?: never }
  | { movieId?: never; movie: Movie };

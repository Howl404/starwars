import type { Movie } from '@/types/Movie';

export type MovieDetailsProps =
  | {
      movieId: string;
      movie?: never;
    }
  | {
      movieId?: never;
      movie: Movie;
    };

import { Routes } from '@/constants/api';
import { useCharacter } from '@/hooks/useCharacter';
import {
  CharacterDetails,
  CharacterDetailsSkeleton,
} from './-components/CharacterDetails';
import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { getIdFromUrl } from '@/utils/getIdFromUrl';

export const Route = createFileRoute(`${Routes.CHARACTERS}/$characterId`)({
  component: CharacterDetailPage,
});

function CharacterDetailPage() {
  const { characterId } = Route.useParams();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Suspense fallback={<CharacterDetailsSkeleton />}>
        <CharacterDetails characterId={characterId} />
      </Suspense>
      <h2 className="text-4xl font-bold text-yellow-400">
        Movies where this character appears
      </h2>
      <Suspense fallback={<CharacterMoviesSkeleton />}>
        <CharacterMovies characterId={characterId} />
      </Suspense>
    </div>
  );
}

function CharacterMovies({ characterId }: { characterId: string }) {
  const { data: character } = useCharacter(characterId);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {character.films.map((url) => (
        <Suspense key={url} fallback={<MovieCardSkeleton />}>
          <MovieCard movieId={getIdFromUrl(url)} />
        </Suspense>
      ))}
    </div>
  );
}

function CharacterMoviesSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

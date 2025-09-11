import { Routes } from '@/constants/api';
import {
  CharacterDetails,
  CharacterDetailsSkeleton,
} from './-components/CharacterDetails';
import { createFileRoute } from '@tanstack/react-router';
import {
  CharacterMovies,
  CharacterMoviesSkeleton,
} from './-components/CharacterMovies';
import { SuspenseWithErrorBoundary } from '@/components/SuspenseWithErrorBoundary/SuspenseWithErrorBoundary';

export const Route = createFileRoute(`${Routes.CHARACTERS}/$characterId`)({
  component: CharacterDetailPage,
});

function CharacterDetailPage() {
  const { characterId } = Route.useParams();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <SuspenseWithErrorBoundary fallback={<CharacterDetailsSkeleton />}>
        <CharacterDetails characterId={characterId} />
      </SuspenseWithErrorBoundary>
      <h2 className="text-4xl font-bold text-yellow-400">
        Movies where this character appears
      </h2>
      <SuspenseWithErrorBoundary fallback={<CharacterMoviesSkeleton />}>
        <CharacterMovies characterId={characterId} />
      </SuspenseWithErrorBoundary>
    </div>
  );
}

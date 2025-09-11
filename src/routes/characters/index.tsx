import {
  CharacterCard,
  CharacterCardSkeleton,
} from '@/components/CharacterCard';
import { Routes } from '@/constants/api';
import { useCharacters } from '@/routes/characters/-hooks/useCharacters';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(`${Routes.CHARACTERS}/`)({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: characters, isLoading: isCharactersLoading } = useCharacters();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <h1 className="text-6xl font-bold text-yellow-400">Characters</h1>
      <div
        role="list"
        aria-label="List of characters"
        className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        {isCharactersLoading &&
          Array.from({ length: 44 }).map((_, index) => (
            <CharacterCardSkeleton key={index} />
          ))}

        {characters?.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
    </div>
  );
}

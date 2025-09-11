import {
  CharacterCard,
  CharacterCardSkeleton,
} from '@/components/CharacterCard';
import { Routes } from '@/constants/api';
import { Search } from '@/routes/characters/-components/Search/Search';
import { useCharacters } from '@/routes/characters/-hooks/useCharacters';
import type { Character } from '@/types/Character';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute(`${Routes.CHARACTERS}/`)({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: characters, isLoading: isCharactersLoading } = useCharacters();

  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();

    const result = characters?.filter((character) =>
      character.name?.toLowerCase().includes(normalizedQuery)
    );

    setFilteredCharacters(result || []);
  };

  useEffect(() => {
    if (characters) {
      setFilteredCharacters(characters);
    }
  }, [characters]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <h1 className="text-6xl font-bold text-yellow-400">Characters</h1>
      <Search
        placeholder="Search for a character..."
        onSearch={handleSearch}
        debounceDelay={1000}
      />
      <div
        role="list"
        aria-label="List of characters"
        className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        {isCharactersLoading &&
          Array.from({ length: 44 }).map((_, index) => (
            <CharacterCardSkeleton key={index} />
          ))}

        {filteredCharacters?.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
        {!isCharactersLoading && !filteredCharacters.length && (
          <p className="text-center text-xl text-gray-500">
            No characters found
          </p>
        )}
      </div>
    </div>
  );
}

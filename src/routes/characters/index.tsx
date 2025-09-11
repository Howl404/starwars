import {
  CharacterCard,
  CharacterCardSkeleton,
} from '@/components/CharacterCard';
import { Search } from '@/components/Search/Search';
import { DefaultErrorFallback } from '@/components/SuspenseWithErrorBoundary/components/DefaultErrorFallback';
import { Routes } from '@/constants/api';
import { useCharacters } from '@/routes/characters/-hooks/useCharacters';
import type { Character } from '@/types/Character';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';

export const Route = createFileRoute(`${Routes.CHARACTERS}/`)({
  component: CharactersPage,
});

export function CharactersPage() {
  const {
    data: characters,
    isLoading: isCharactersLoading,
    isError: isCharacterError,
    error: characterError,
  } = useCharacters();

  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const handleSearch = useCallback(
    (query: string) => {
      if (!characters) return;

      const normalizedQuery = query.toLowerCase().trim();
      const result = characters.filter((character) =>
        character.name?.toLowerCase().includes(normalizedQuery)
      );
      setFilteredCharacters(result);
    },
    [characters]
  );

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
        className={`grid flex-1 gap-4 ${
          isCharacterError
            ? 'grid-cols-1'
            : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {isCharactersLoading &&
          Array.from({ length: 44 }).map((_, index) => (
            <CharacterCardSkeleton key={index} />
          ))}

        {filteredCharacters?.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
        {!isCharactersLoading &&
          !isCharacterError &&
          !filteredCharacters.length && (
            <p className="text-center text-xl text-gray-500">
              No characters found
            </p>
          )}
        {isCharacterError && <DefaultErrorFallback error={characterError} />}
      </div>
    </div>
  );
}

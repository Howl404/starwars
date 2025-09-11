import { Routes } from '@/constants/api';
import { useCharacter } from '@/hooks/useCharacter';
import type { Character } from '@/types/Character';
import { getIdFromUrl } from '@/utils/getIdFromUrl';
import { Link } from '@tanstack/react-router';
import type { CharacterCardProps } from './CharacterCard.types';

export function CharacterCard({ character, characterId }: CharacterCardProps) {
  if (character) {
    return <CharacterContent character={character} />;
  }

  return <CharacterFromUrl characterId={characterId} />;
}

function CharacterContent({ character }: { character: Character }) {
  return (
    <Link
      to={`${Routes.CHARACTERS}/$characterId`}
      params={{ characterId: getIdFromUrl(character.url) }}
      aria-label={`View details for ${character.name}`}
      className="group flex items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="mb-2 h-7 font-semibold text-gray-900 group-hover:underline">
        {character.name}
      </h3>
    </Link>
  );
}

function CharacterFromUrl({ characterId }: { characterId: string }) {
  const { data: character } = useCharacter(characterId);
  return <CharacterContent character={character} />;
}

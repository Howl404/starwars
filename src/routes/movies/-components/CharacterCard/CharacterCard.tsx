import { useCharacter } from '@/hooks/useCharacter';
import type { CharacterCardProps } from '@/routes/movies/-components/CharacterCard/CharacterCard.types';
import { Link } from '@tanstack/react-router';

export function CharacterCard({ characterUrl }: CharacterCardProps) {
  const { data: character } = useCharacter(characterUrl);

  return (
    <Link
      to="/"
      aria-label={`View details for ${character.name}`}
      className="group flex items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="mb-2 h-7 font-semibold text-gray-900 group-hover:underline">
        {character.name}
      </h3>
    </Link>
  );
}

import type { CharacterCardProps } from '@/routes/movies/-components/CharacterCard/CharacterCard.types';
import type { Character } from '@/types/Character';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

export function CharacterCard({ characterUrl }: CharacterCardProps) {
  const { data: character } = useSuspenseQuery<Character>({
    queryKey: ['character', characterUrl],
    queryFn: async () => {
      const res = await fetch(characterUrl);
      return res.json();
    },
  });

  return (
    <Link
      to="/"
      aria-label={`View details for ${character.name}`}
      className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="mb-2 h-7 font-semibold text-gray-900 group-hover:underline">
        {character.name}
      </h3>
    </Link>
  );
}

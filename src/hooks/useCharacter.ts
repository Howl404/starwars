import { CHARACTERS_API_URL } from '@/constants/api';
import type { Character } from '@/types/Character';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useCharacter(characterId: string) {
  return useSuspenseQuery<Character>({
    queryKey: ['character', characterId],
    queryFn: async () => {
      const res = await fetch(`${CHARACTERS_API_URL}/${characterId}`);
      return res.json();
    },
  });
}

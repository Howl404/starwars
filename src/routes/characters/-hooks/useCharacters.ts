import { CHARACTERS_API_URL } from '@/constants/api';
import type { Character } from '@/types/Character';
import { useQuery } from '@tanstack/react-query';

export function useCharacters() {
  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      const res = await fetch(CHARACTERS_API_URL);
      return res.json();
    },
  });
}
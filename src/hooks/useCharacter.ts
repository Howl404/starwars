import { CHARACTERS_API_URL } from '@/constants/api';
import type { Character } from '@/types/Character';
import { getIdFromUrl } from '@/utils/getIdFromUrl';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export function useCharacter(characterId: string) {
  const queryClient = useQueryClient();

  return useSuspenseQuery<Character>({
    queryKey: ['character', characterId],
    queryFn: async () => {
      const characters = queryClient.getQueryData<Character[]>(['characters']);
      const cachedCharacter = characters?.find(
        (ch) => getIdFromUrl(ch.url) === characterId
      );

      if (cachedCharacter) {
        return cachedCharacter;
      }

      const res = await fetch(`${CHARACTERS_API_URL}/${characterId}`);
      return res.json();
    },
  });
}

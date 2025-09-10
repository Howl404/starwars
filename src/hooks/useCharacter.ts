import type { Character } from "@/types/Character";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useCharacter(characterUrl: string) {
  return  useSuspenseQuery<Character>({
      queryKey: ['character', characterUrl],
      queryFn: async () => {
        const res = await fetch(characterUrl);
        return res.json();
      },
    });
}
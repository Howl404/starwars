import type { Character } from '@/types/Character';

export type CharacterDetailsProps =
  | {
      characterId: string;
      character?: never;
    }
  | {
      characterId?: never;
      character: Character;
    };

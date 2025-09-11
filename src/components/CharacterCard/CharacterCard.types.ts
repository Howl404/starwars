import type { Character } from '@/types/Character';

export type CharacterCardProps =
  | { characterId: string; character?: never }
  | { characterId?: never; character: Character };

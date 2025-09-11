import type { Character } from '@/types/Character';
import type { JSX } from 'react';

export type CharacterDetailsProps =
  | {
      characterId: string;
      character?: never;
    }
  | {
      characterId?: never;
      character: Character;
    };

export type CharacterField = {
  key: keyof Character;
  label: string;
  icon: JSX.Element;
  suffix?: string;
  colorBox?: boolean;
};

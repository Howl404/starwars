import { useCharacter } from '@/hooks/useCharacter';
import type { Character } from '@/types/Character';
import type { CharacterDetailsProps } from './CharacterDetails.types';
import { DetailItem } from './components/DetailItem';
import { getCharacterFieldValue } from './utils/getCharacterFieldValue';
import { characterFields } from './constants/characterFields';

export function CharacterDetails({
  characterId,
  character,
}: CharacterDetailsProps) {
  if (character) {
    return <CharacterDetailsContent {...character} />;
  }

  return <CharacterDetailsFromUrl characterId={characterId} />;
}

function CharacterDetailsContent(character: Character) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="ml-auto text-5xl font-bold">{character.name}</h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {characterFields.map((field) => (
          <DetailItem
            key={field.key}
            icon={field.icon}
            label={field.label}
            value={getCharacterFieldValue(character, field) || 'n/a'}
            colorBox={
              field.colorBox
                ? getCharacterFieldValue(character, field)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

function CharacterDetailsFromUrl({ characterId }: { characterId: string }) {
  const { data: character } = useCharacter(characterId);
  return <CharacterDetailsContent {...character} />;
}

import { useCharacter } from '@/hooks/useCharacter';
import type { Character } from '@/types/Character';
import {
  FaBirthdayCake,
  FaEye,
  FaPalette,
  FaRuler,
  FaVenusMars,
  FaWeight,
} from 'react-icons/fa';
import type { CharacterDetailsProps } from './CharacterDetails.types';

export function CharacterDetails({
  characterId,
  character,
}: CharacterDetailsProps) {
  if (character) {
    return <CharacterDetailsContent {...character} />;
  }

  return <CharacterDetailsFromUrl characterId={characterId} />;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  colorBox?: string;
}

function DetailItem({ icon, label, value, colorBox }: DetailItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-gray-50 p-4 transition-colors hover:bg-gray-100">
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{value}</span>
          {colorBox &&
            colorBox !== 'n/a' &&
            colorBox
              .split(',')
              .map((color) => (
                <div
                  key={color.trim()}
                  className="h-4 w-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                  title={`${label}: ${value}`}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

function CharacterDetailsContent({
  name,
  height,
  mass,
  hair_color,
  skin_color,
  eye_color,
  birth_year,
  gender,
}: Character) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="ml-auto text-5xl font-bold">{name}</h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <DetailItem icon={<FaRuler />} label="Height" value={`${height} cm`} />
        <DetailItem icon={<FaWeight />} label="Mass" value={`${mass} kg`} />
        <DetailItem
          icon={<FaPalette />}
          label="Hair Color"
          value={hair_color}
          colorBox={hair_color}
        />
        <DetailItem
          icon={<FaPalette />}
          label="Skin Color"
          value={skin_color}
          colorBox={skin_color}
        />
        <DetailItem
          icon={<FaEye />}
          label="Eye Color"
          value={eye_color}
          colorBox={eye_color}
        />
        <DetailItem
          icon={<FaBirthdayCake />}
          label="Birth Year"
          value={birth_year}
        />
        <DetailItem icon={<FaVenusMars />} label="Gender" value={gender} />
      </div>
    </div>
  );
}

function CharacterDetailsFromUrl({ characterId }: { characterId: string }) {
  const { data: character } = useCharacter(characterId);
  return <CharacterDetailsContent {...character} />;
}

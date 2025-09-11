import type { CharacterField } from "../CharacterDetails.types";
import type { Character } from "@/types/Character";

export function getCharacterFieldValue(
  character: Character,
  field: CharacterField
) {
  const value = character[field.key];

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (value) {
    return field.suffix ? `${value}${field.suffix}` : value;
  }

  return undefined;
}
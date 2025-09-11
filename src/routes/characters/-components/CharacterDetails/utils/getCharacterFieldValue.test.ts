import { getCharacterFieldValue } from './getCharacterFieldValue';
import type { Character } from '@/types/Character';
import type { JSX } from 'react';
import { expect, describe, it } from 'vitest';

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
  url: 'https://swapi.dev/api/people/1/',
};

const mockIcon = {} as JSX.Element;

describe('getCharacterFieldValue', () => {
  it('should return correct value for field', () => {
    expect(
      getCharacterFieldValue(mockCharacter, {
        key: 'name',
        label: '',
        icon: mockIcon,
      })
    ).toBe('Luke Skywalker');
  });

  it('should return correct value with suffix for field', () => {
    expect(
      getCharacterFieldValue(mockCharacter, {
        key: 'height',
        label: '',
        icon: mockIcon,
        suffix: ' cm',
      })
    ).toBe('172 cm');
  });

  it('should return joined string for array field', () => {
    expect(
      getCharacterFieldValue(mockCharacter, {
        key: 'films',
        label: '',
        icon: mockIcon,
      })
    ).toBe('https://swapi.dev/api/films/1/, https://swapi.dev/api/films/2/');
  });
});

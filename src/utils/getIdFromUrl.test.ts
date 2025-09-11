import { getIdFromUrl } from '@/utils/getIdFromUrl';
import { describe, expect, it } from 'vitest';

describe('getIdFromUrl', () => {
  it('should extract ID from URL correctly', () => {
    const url = 'https://swapi.dev/api/people/1/';
    const id = getIdFromUrl(url);
    expect(id).toBe('1');
  });
});

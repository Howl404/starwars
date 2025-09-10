export const API_BASE_URL = 'https://swapi.info/api';
export const MOVIES_API_URL = `${API_BASE_URL}/films`;
export const CHARACTERS_API_URL = `${API_BASE_URL}/people`;

export const Routes = {
  HOME: '/',
  MOVIES: '/movies',
  CHARACTERS: '/characters',
} as const;

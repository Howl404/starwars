import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CHARACTERS_API_URL } from '@/constants/api';
import { useCharacter } from '@/hooks/useCharacter';

const mockCharacters = [
  {
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
  },
  {
    name: 'Luke Skywalker',
    height: '171',
    mass: '75',
    hair_color: 'blonde',
    skin_color: 'faire',
    eye_color: 'bluee',
    birth_year: '19BBY2',
    gender: 'male',
    films: [
      'https://swapi.dev/api/films/15/',
      'https://swapi.dev/api/films/22/',
    ],
    url: 'https://swapi.dev/api/people/2/',
  },
];

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('useCharacter', () => {
  const fetchMock = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns character from cache if it exist', async () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(['characters'], mockCharacters);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCharacter('1'), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockCharacters[0]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('makes fetch call if character is not in cache', async () => {
    const queryClient = createQueryClient();
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve(mockCharacters[0]),
    });

    global.fetch = fetchMock;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCharacter('1'), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(fetchMock).toHaveBeenCalledWith(`${CHARACTERS_API_URL}/1`);
    expect(result.current.data).toEqual(mockCharacters[0]);
  });
});

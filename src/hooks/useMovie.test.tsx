import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMovie } from './useMovie';
import { MOVIES_API_URL } from '@/constants/api';

const mockMovies = [
  {
    episode_id: 1,
    title: 'Movie 1',
    director: 'Director 1',
    release_date: '2023-01-01',
  },
  {
    episode_id: 2,
    title: 'Movie 2',
    director: 'Director 2',
    release_date: '2023-01-02',
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

describe('useMovie', () => {
  const fetchMock = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns movie from cache if it exist', async () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(['movies'], mockMovies);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useMovie('1'), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockMovies[0]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('makes fetch call if movie is not in cache', async () => {
    const queryClient = createQueryClient();
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve(mockMovies[0]),
    });

    global.fetch = fetchMock;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useMovie('1'), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(fetchMock).toHaveBeenCalledWith(`${MOVIES_API_URL}/1`);
    expect(result.current.data).toEqual(mockMovies[0]);
  });
});

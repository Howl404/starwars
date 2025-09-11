import { mockCharacters } from '@/mocks/characters.mock';
import { routeTree } from '@/routeTree.gen';
import type { Character } from '@/types/Character';
import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCharacters } from './-hooks/useCharacters';

vi.mock('./-hooks/useCharacters');

const renderWithProviders = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultStructuralSharing: true,
    history: createMemoryHistory({
      initialEntries: ['/characters/'],
    }),
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

describe('CharactersPage', () => {
  const mockUseCharacters = vi.mocked(useCharacters);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page title and search input', async () => {
    mockUseCharacters.mockReturnValue({
      data: mockCharacters,
      isLoading: false,
    } as UseQueryResult<Character[], Error>);

    renderWithProviders();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Characters' })
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Search for a character...')
      ).toBeInTheDocument();
    });
  });

  it('displays loading skeletons when data is loading', async () => {
    mockUseCharacters.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as UseQueryResult<Character[], Error>);

    renderWithProviders();

    await waitFor(() => {
      const skeletons = screen.queryAllByTestId('character-card-skeleton');
      expect(skeletons).toHaveLength(44);
    });
  });

  it('displays all characters when loaded', async () => {
    mockUseCharacters.mockReturnValue({
      data: mockCharacters,
      isLoading: false,
    } as UseQueryResult<Character[], Error>);

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
      expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    });
  });

  it('filters characters based on search query', async () => {
    mockUseCharacters.mockReturnValue({
      data: mockCharacters,
      isLoading: false,
    } as UseQueryResult<Character[], Error>);

    renderWithProviders();

    await waitFor(async () => {
      const searchInput = screen.getByPlaceholderText(
        'Search for a character...'
      );

      await userEvent.type(searchInput, 'Luke');
    });

    await waitFor(
      () => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.queryByText('Darth Vader')).not.toBeInTheDocument();
        expect(screen.queryByText('Leia Organa')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('shows all characters when search is cleared', async () => {
    mockUseCharacters.mockReturnValue({
      data: mockCharacters,
      isLoading: false,
    } as UseQueryResult<Character[], Error>);

    renderWithProviders();

    const searchInput = await screen.findByPlaceholderText(
      'Search for a character...'
    );

    await userEvent.type(searchInput, 'Luke');

    await waitFor(
      () => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.queryByText('Darth Vader')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await userEvent.clear(searchInput);

    await waitFor(
      () => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Darth Vader')).toBeInTheDocument();
        expect(screen.getByText('Leia Organa')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('shows "No characters found" when no matches', async () => {
    mockUseCharacters.mockReturnValue({
      data: mockCharacters,
      isLoading: false,
    } as UseQueryResult<Character[], Error>);

    renderWithProviders();

    const searchInput = await screen.findByPlaceholderText(
      'Search for a character...'
    );

    await userEvent.type(searchInput, 'Nonexistent Character');

    await waitFor(
      () => {
        expect(screen.getByText('No characters found')).toBeInTheDocument();
        expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
        expect(screen.queryByText('Darth Vader')).not.toBeInTheDocument();
        expect(screen.queryByText('Leia Organa')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});

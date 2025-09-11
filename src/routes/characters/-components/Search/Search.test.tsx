import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from './Search';

describe('Search Component', () => {
  it('renders the input with the correct placeholder', () => {
    render(<Search placeholder="Search characters..." onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search characters...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('updates the input value when user types', () => {
    render(<Search placeholder="Type here..." onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Type here...');
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(input).toHaveValue('Luke');
  });

  it('calls onSearch with the debounced value after the delay', async () => {
    const onSearchMock = vi.fn();

    render(<Search placeholder="Search here..." onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search here...');

    fireEvent.change(input, { target: { value: 'Vader' } });

    expect(onSearchMock).toHaveBeenCalledWith('');

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('Vader');
    });
  });

  it('debounces multiple quick changes and calls onSearch only once', async () => {
    const onSearchMock = vi.fn();

    render(<Search placeholder="Search..." onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: 'L' } });
    fireEvent.change(input, { target: { value: 'Lu' } });
    fireEvent.change(input, { target: { value: 'Luk' } });
    fireEvent.change(input, { target: { value: 'Luke' } });

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledTimes(2);
      expect(onSearchMock).toHaveBeenCalledWith('Luke');
    });
  });

  it('handles empty search values correctly', async () => {
    const onSearchMock = vi.fn();

    render(<Search placeholder="Search..." onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('');
    });
  });
});

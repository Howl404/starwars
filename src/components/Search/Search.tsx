import { useEffect, useState } from 'react';
import { useDebounce } from '../../routes/characters/-hooks/useDebounce';
import type { SearchProps } from './Search.types';

export function Search({
  placeholder = 'Search...',
  onSearch,
  debounceDelay = 500,
}: SearchProps) {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, debounceDelay);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full rounded border p-2"
    />
  );
}

export type SearchProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceDelay?: number;
};

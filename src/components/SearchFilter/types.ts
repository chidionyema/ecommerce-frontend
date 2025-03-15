// src/components/SearchFilter/types.ts

export type FilterType = 'text' | 'select' | 'checkbox' | 'radio' | 'range' | 'date' | 'custom';
export type PanelType = 'filter' | 'sort' | 'advanced';
export type SortDirection = 'asc' | 'desc';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: FilterType;
  options?: FilterOption[];
  placeholder?: string;
  minLabel?: string;
  maxLabel?: string;
  searchable?: boolean; // Enable search within this filter group
  collapsible?: boolean; // Can this filter group be collapsed
  defaultCollapsed?: boolean; // Start collapsed if collapsible
}

export interface SortOption {
  id: string;
  label: string;
  description?: string;  /
  defaultDirection?: SortDirection;
  allowDirectionChange?: boolean; // Whether this sort option supports direction change
}

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export interface SearchResults {
  count: number;
  total: number;
}

export interface ColorConfig {
  primary: string;
  surface: string;
  text: string;
  textSecondary: string;
  bgLight: string;
  border: string;
  divider: string;
  error: string;
}

// New interface for persisting search state
export interface PersistedState {
  search?: string;
  filters?: Record<string, any>;
  sort?: string;
  sortDirection?: SortDirection;
}

export interface SearchFilterProps {
  // Core functionality props
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, any>) => void;
  onSort?: (sortId: string) => void;
  onSortDirectionChange?: (direction: SortDirection) => void;
  filterGroups?: FilterGroup[];
  sortOptions?: SortOption[];
  initialValues?: {
    search?: string;
    filters?: Record<string, any>;
    sort?: string;
    sortDirection?: SortDirection;
  };
  loading?: boolean;
  results?: SearchResults;
  
  // UI customization props
  title?: string;
  placeholder?: string;
  primaryColor?: string;
  compact?: boolean;
  showSearchHistory?: boolean;
  maxVisibleFilters?: number;
  
  // Performance props
  debounceDelay?: number;
  
  // Advanced configuration
  renderCustomFilterOption?: (option: FilterOption, selected: boolean, onClick: () => void) => React.ReactNode;
  filterAccessibilityLabels?: Record<string, string>;
  
  // Styling props
  className?: string;
  style?: React.CSSProperties;
  elevation?: number;
  borderRadius?: number;
  
  // Enhanced functionality props
  liveFiltering?: boolean;                  // Enable real-time filtering without Apply button
  enableTypoTolerance?: boolean;            // Enable fuzzy search for typo tolerance
  autocompleteOptions?: string[];           // Suggestions for autocomplete
  autocompleteFetch?: (query: string) => Promise<string[]>; // Dynamic fetch for autocomplete
  enableSortDirection?: boolean;            // Enable sort direction control
  persistState?: boolean;                   // Save filter state to localStorage
  persistStateKey?: string;                 // Key for localStorage
  enableFilterSearch?: boolean;             // Search within filter options
  synonymMap?: Record<string, string[]>;    // Map terms to synonyms for broader search
  saveSearches?: boolean;                   // Allow users to save searches
}
import { create } from 'zustand';

import { SearchMultiResult, fetchMultiSearch } from '../../api/tmdbSearchService.js';

export interface SearchStoreState {
  searchResult: Map<number, SearchMultiResult>,
  isLoading: boolean,
  error: unknown | null,
  totalPages: number,
  reset: () => void,
  fetchBySearch: (query: string, page: number) => Promise<void>
}

const useSearchStore = create<SearchStoreState>((set) => ({
  searchResult: new Map(),
  isLoading: false,
  error: null,
  totalPages: 0,
  reset: () => {
    set(
      (state) => ({
        ...state,
        searchResult: new Map(),
        isLoading: false,
        error: null,
        totalPages: 0,
      }),
      true
    );
  },
  fetchBySearch: async (query: string, page: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetchMultiSearch(query, page);

      set((state) => ({
        isLoading: false,
        error: null,
        searchResult: new Map([...state.searchResult, ...response.results]),
        totalPages: response.totalPages,
      }));
    } catch (error) {
      set({ isLoading: false, error });
    }
  },
}));

export const searchResultSelector = (state: SearchStoreState) => {
  return Array.from(state.searchResult.values());
};

export const searchResultByIdSelector = (state: SearchStoreState, id: number) => {
  return state.searchResult.get(id);
};

export default useSearchStore;

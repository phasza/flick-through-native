import { create } from 'zustand';

import { fetchMultiSearch } from '../../api/tmdbSearchService';

const useSearchStore = create((set) => ({
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
  fetchBySearch: async (query, page) => {
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

export const searchResultSelector = (state) => {
  return Array.from(state.searchResult.values());
};

export const searchResultByIdSelector = (state, id) => {
  return state.searchResult.get(id);
};

export default useSearchStore;

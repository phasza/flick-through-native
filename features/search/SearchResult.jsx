import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Outlet, useParams } from 'react-router-native';

import SearchResultList from './SearchResultList';
import useSearchStore, { searchResultSelector } from './searchStore';

const SearchResult = () => {
  const { query } = useParams();

  if (query === undefined) {
    throw Error('Invalid route configuration, query param is undefined');
  }

  const movies = useSearchStore(searchResultSelector);
  const isLoading = useSearchStore((state) => state.isLoading);
  const error = useSearchStore((state) => state.error);
  const totalPages = useSearchStore((state) => state.totalPages);
  const fetchBySearch = useSearchStore((state) => state.fetchBySearch);

  const [currentPage, setCurrentPage] = useState(1);

  const didMount = useRef(true);
  useEffect(() => {
    // Skip first render to avoid double fetch
    if (didMount.current) {
      didMount.current = false;
    } else {
      fetchBySearch(query, currentPage).catch(console.error);
    }
  }, [currentPage, query]);

  // TODO style
  return (
    <View>
      <Outlet />
      <SearchResultList
        movies={movies}
        next={() => {
          setCurrentPage((prev) => prev + 1);
        }}
        hasMore={currentPage < totalPages}
        isLoading={isLoading}
        error={error}
      />
    </View>
  );
};

export default SearchResult;

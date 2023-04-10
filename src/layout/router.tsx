import React from 'react';
import { createMemoryRouter } from 'react-router-native';

import MovieDetails from '../features/details/MovieDetails';
import TVSeriesDetails from '../features/details/TVSeriesDetails';
import Home from '../features/home/Home';
import SearchResult from '../features/search/SearchResult';
import { ROUTES } from './routes';

const router = createMemoryRouter([
  {
    path: ROUTES.ROOT,
    element: <Home />,
    errorElement: <Home />,
    children: [
      {
        path: ROUTES.SEARCH,
        element: <SearchResult />,
        children: [
          {
            path: ROUTES.MOVIE_DETAILS,
            element: <MovieDetails />,
          },
          {
            path: ROUTES.TV_SERIES_DETAILS,
            element: <TVSeriesDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;

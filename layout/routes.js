import { generatePath } from 'react-router-native';

export const ROUTES = {
  ROOT: '/',
  SEARCH: '/search/:query',
  MOVIE_DETAILS: 'movie/:id',
  TV_SERIES_DETAILS: 'series/:id',
};

export const getPathToRoot = () => ROUTES.ROOT;

export const getPathToSearch = (query) =>
  generatePath(ROUTES.SEARCH, { query });

export const getPathToMovieDetails = (query, id) =>
  generatePath(ROUTES.SEARCH, { query }) +
  '/' +
  generatePath(ROUTES.MOVIE_DETAILS, { id });

export const getPathToTVSeriesDetails = (query, id) =>
  generatePath(ROUTES.SEARCH, { query }) +
  '/' +
  generatePath(ROUTES.TV_SERIES_DETAILS, { id });

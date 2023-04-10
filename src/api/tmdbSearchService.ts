import { apiKey, baseUrl } from './tmdbConfig';

export interface SearchResultMovie {
  id: number;
  genre_ids: number[];
  backdrop_path: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export const instanceOfSearchResultMovie = (
  object: any
): object is SearchResultMovie => {
  return 'title' in object;
};

export interface SearchResultTVSeries {
  id: number;
  backdrop_path: string;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
}

export const instanceOfSearchResultTVSeries = (
  object: any
): object is SearchResultTVSeries => {
  return 'first_air_date' in object;
};

export interface SearchResultProfile {
  profile_path: string;
  adult: boolean;
  id: number;
  media_type: string;
  name: string;
  popularity: number;
}

export const instanceOfSearchResultProfile = (
  obj: any
): obj is SearchResultProfile => {
  return 'profile_path' in obj;
};

export type SearchMultiResult = SearchResultTVSeries | SearchResultMovie;

interface SearchMultiRawResponse {
  results: any[];
  total_pages: number;
  total_results: number;
}

const doMultiSearch = async (
  query: string,
  page: number
): Promise<SearchMultiRawResponse> => {
  const response = await fetch(
    `${baseUrl}/search/multi?api_key=${apiKey}&language=en-US&page=${page}&include_adult=false&query=${query}`
  );
  return await response.json();
};

interface SearchMultiResponse {
  results: Map<number, SearchMultiResult>;
  totalPages: number;
}

export const fetchMultiSearch = async (
  query: string,
  page: number
): Promise<SearchMultiResponse> => {
  const response = await doMultiSearch(query, page);
  const results = new Map<number, SearchMultiResult>();
  response.results.forEach((i) => {
    if (instanceOfSearchResultProfile(i)) {
      return;
    }

    if (i.poster_path === null) {
      return;
    }

    results.set(i.id, i);
  });
  return {
    results,
    totalPages: response.total_pages,
  };
};
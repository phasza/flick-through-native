import { apiKey, baseUrl } from './tmdbConfig';

export const instanceOfSearchResultMovie = (object) => {
  return 'title' in object;
};

export const instanceOfSearchResultTVSeries = (object) => {
  return 'first_air_date' in object;
};

export const instanceOfSearchResultProfile = (obj) => {
  return 'profile_path' in obj;
};

const doMultiSearch = async (query, page) => {
  const response = await fetch(
    `${baseUrl}/search/multi?api_key=${apiKey}&language=en-US&page=${page}&include_adult=false&query=${query}`
  );
  return await response.json();
};

export const fetchMultiSearch = async (query, page) => {
  const response = await doMultiSearch(query, page);
  const results = new Map();
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

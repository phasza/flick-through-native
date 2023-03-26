import { apiKey, baseUrl } from './tmdbConfig';

export const fetchTVSeriesDetails = async (id) => {
  const response = await fetch(
    `${baseUrl}/tv/${id}?api_key=${apiKey}&language=en-US`
  );
  const result = await response.json();
  return result;
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(
    `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
  );
  const result = await response.json();
  return result;
};

export const fetchTVSeriesContentRating = async (id) => {
  const response = await fetch(
    `${baseUrl}/tv/${id}/content_ratings?api_key=${apiKey}`
  );
  const result = await response.json();
  const ratingList = result.results;
  if (ratingList.length === 0) {
    return null;
  }

  return (
    ratingList.find((i) => i.iso_3166_1.toLowerCase().includes('gb')) ??
    ratingList[0]
  );
};

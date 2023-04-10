import { apiKey, baseUrl } from './tmdbConfig';

interface Genre {
  id: number;
  name: string;
}

interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Country {
  iso_3166_1: string;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface TVSeriesCreator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface TVSeriesEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_averag: number;
  vote_count: number;
}

interface TVSeariesSeason {
  air_date: string;
  episode_count: number;
  i: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface TVSeriesDetailsResponse {
  backdrop_path: string;
  created_by: TVSeriesCreator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TVSeriesEpisode;
  name: string;
  next_episode_to_air: TVSeriesEpisode;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: Country[];
  seasons: TVSeariesSeason[];
  spoken_languages: Language[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export const fetchTVSeriesDetails = async (
  id: number
): Promise<TVSeriesDetailsResponse> => {
  const response = await fetch(
    `${baseUrl}/tv/${id}?api_key=${apiKey}&language=en-US`
  );
  const result = await response.json();
  return result;
};

export interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: Country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const fetchMovieDetails = async (
  id: number
): Promise<MovieDetailsResponse> => {
  const response = await fetch(
    `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
  );
  const result = await response.json();
  return result;
};

interface RawTVSeriesContentRatingResponse {
  results: TVSeriesContentRating[];
  id: number;
}

export interface TVSeriesContentRating {
  iso_3166_1: string;
  rating: string;
}

export const fetchTVSeriesContentRating = async (
  id: number
): Promise<TVSeriesContentRating | null> => {
  const response = await fetch(
    `${baseUrl}/tv/${id}/content_ratings?api_key=${apiKey}`
  );
  const result: RawTVSeriesContentRatingResponse = await response.json();
  const ratingList = result.results;
  if (ratingList.length === 0) {
    return null;
  }

  return (
    ratingList.find((i) => i.iso_3166_1.toLowerCase().includes('gb')) ??
    ratingList[0]
  );
};

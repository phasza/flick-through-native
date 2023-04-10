// TODO: these should come form the API configuration -> {{baseUrl}}/configuration?api_key={{apiKey}}

const baseUrl = 'https://image.tmdb.org/t/p';

export const BackdropSizes = {
  w300: 'w300',
  w780: 'w780',
  w1280: 'w1280',
  original: 'original',
};

export const PosterSizes = {
  w92: 'w92',
  w154: 'w154',
  w185: 'w185',
  w342: 'w342',
  w500: 'w500',
  w780: 'w780',
  original: 'original',
};

export const getImgSrcPath = (apiResponsePath: string, size: string) => {
  return `${baseUrl}/${size}${apiResponsePath}`;
};

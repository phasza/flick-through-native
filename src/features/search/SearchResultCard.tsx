import React from 'react';
import { Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { getImgSrcPath, PosterSizes } from '../../api/tmdbImage';

import { SearchMultiResult, instanceOfSearchResultMovie } from '../../api/tmdbSearchService';
import { getPathToMovieDetails, getPathToTVSeriesDetails } from '../../layout/routes';

interface Props {
  result: SearchMultiResult
}

const SearchResultCard = ({ result }: Props) => {
  const { query } = useParams();

  if (query === undefined) {
    throw Error('Invalid route configuration, query param is undefined');
  }
  const navigate = useNavigate();

  const title = instanceOfSearchResultMovie(result)
    ? result.title
    : result.name;

  const handleOnClick = () => {
    if (instanceOfSearchResultMovie(result)) {
      navigate(getPathToMovieDetails(query, result.id));
    } else {
      navigate(getPathToTVSeriesDetails(query, result.id));
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handleOnClick}
    >
      {result.poster_path !== null ? (
        <Image
          style={styles.image}
          source={{ uri: getImgSrcPath(result.poster_path, PosterSizes.w185) } }
        />
      ) : (
        <Text>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 8,
    margin: 2.5,
    width: 92,
    height: 138,
    renderToHardwareTextureAndroid: true
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default SearchResultCard;

import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { useParams } from 'react-router-native';
import { getYearFromDate } from '../../api/tmdbDate';

import { fetchMovieDetails } from '../../api/tmdbDetailsService';
import { BackdropSizes, getImgSrcPath } from '../../api/tmdbImage';
import useFetchData from '../../hooks/useFetchData';
import DetailsModal from './DetailsModal';

const MovieDetails = () => {
  const { id } = useParams();

  if (id === undefined) {
    throw Error('Invalid route, missing id');
  }

  const { result, isLoading, error } = useFetchData(
    async () => await fetchMovieDetails(+id)
  );

  return (
    <DetailsModal isLoading={isLoading} error={error}>
      {result !== undefined && (
        <>
          <Image
            style={styles.image}
            src={getImgSrcPath(result.backdrop_path, BackdropSizes.w780)}
          />
          <Text style={styles.text}>{result.name}</Text>
          <Text style={styles.text}>{getYearFromDate(result.release_date)}</Text>
          <Text style={styles.text}>{result.overview}</Text>
          <Text style={styles.text}>{result.original_language}</Text>
        </>
      )}
    </DetailsModal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  text: {
    color: 'rgb(255, 255, 255)'
  }
});

export default MovieDetails;

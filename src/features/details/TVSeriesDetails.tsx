import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { useParams } from 'react-router-native';

import { getYearFromDate } from '../../api/tmdbDate';
import {
  fetchTVSeriesContentRating,
  fetchTVSeriesDetails,
} from '../../api/tmdbDetailsService';
import { getImgSrcPath, BackdropSizes } from '../../api/tmdbImage';
import useFetchData from '../../hooks/useFetchData';
import DetailsModal from './DetailsModal';

const TVSeriesDetails = () => {
  const { id } = useParams();

  if (id === undefined) {
    throw Error('Invalid route, missing id');
  }

  const {
    result: series,
    isLoading,
    error,
  } = useFetchData(async () => await fetchTVSeriesDetails(+id));
  const { result: rating } = useFetchData(
    async () => await fetchTVSeriesContentRating(+id)
  );

  return (
    <DetailsModal isLoading={isLoading} error={error}>
      {series !== undefined && (
        <>
          <Image
            style={styles.image}
            source={ { uri:  getImgSrcPath(series.backdrop_path, BackdropSizes.w780)} }
          />
          <Text style={styles.text}>{series.name}</Text>
          <Text style={styles.text}>{getYearFromDate(series.first_air_date)}</Text>
          {rating && <Text>{rating.rating}</Text>}
          <Text style={styles.text}>{series.overview}</Text>
          <Text style={styles.text}>{series.first_air_date}</Text>
          <Text style={styles.text}>{series.original_language}</Text>
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

export default TVSeriesDetails;

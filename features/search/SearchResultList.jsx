import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { windowWidth } from '../../layout/window';

import SearchResultCard from './SearchResultCard';

const posterSizeWidth = 92;

const SearchResultList = ({
  movies,
  next,
  hasMore,
  isLoading,
  error,
}) => {
  const [numColumns, setNumColumns] = useState(1);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const numColumns = Math.floor(width / posterSizeWidth);
    setNumColumns(numColumns);
  }

  const getListEmptyComponent = () => {
    if(isLoading) {
      return <Text>Loading..</Text>;
    }
    
    if (error) {
      return <Text>{JSON.stringify(error)}</Text>;
    }

    return <Text>No matching movies or series found!</Text>;
  }

  // TODO do something with the error
  return (
    <View onLayout={onLayout} style={{width: windowWidth, alignItems: 'center'}}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <SearchResultCard result={item} />}
        keyExtractor={(item, index) => item.id}
        key={numColumns}
        numColumns={numColumns}
        ListEmptyComponent={ getListEmptyComponent }
        onEndReached={(info) => {
          if (!hasMore || error !== null || isLoading) {
            return;
          }

          next();
        }} />
    </View>
  );
};

export default SearchResultList;

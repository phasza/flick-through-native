import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextInput
      style={styles.container}
      value={value}
      onChangeText={onChange}
      placeholder='Search movies...'
    />
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: (2 * windowWidth) / 3,
    backgroundColor: 'rgb(255, 255, 255)',
  },
});

export default SearchBar;

import React, { useState } from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
import { useNavigate } from 'react-router-native';
import useSearchStore from '../features/search/searchStore';
import { getPathToRoot, getPathToSearch } from './routes';

const SearchBar = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const reset = useSearchStore((state) => state.reset);

  const handleSearchOnChange = (newVal: string) => {
    setTerm(newVal);
    reset();
    navigate(newVal === '' ? getPathToRoot() : getPathToSearch(newVal));
  };

  return (
    <TextInput
      style={styles.container}
      value={term}
      onChangeText={handleSearchOnChange}
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

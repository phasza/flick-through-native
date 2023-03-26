import React from 'react';
import { StyleSheet, View } from 'react-native';

import SearchBar from './SearchBar';
import { windowWidth } from './window';

const Header = ({ onSearchChange }) => {
  return (
    <View style={styles.container}>
      <SearchBar onChange={onSearchChange} />
    </View>
  );
};

// className='fixed z-50 flex h-12 w-screen items-center justify-around bg-green-300'
const styles = StyleSheet.create({
  container: {
    height: 50,
    width: windowWidth,
    backgroundColor: 'rgb(134 239 172)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Header;

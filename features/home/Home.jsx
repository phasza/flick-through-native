import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../layout/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-native';
import useSearchStore from '../search/searchStore';
import { getPathToRoot, getPathToSearch } from '../../layout/routes';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const reset = useSearchStore((state) => state.reset);

  const handleSearchOnChange = (newVal) => {
    reset();
    navigate(newVal === '' ? getPathToRoot() : getPathToSearch(newVal), {
      state: { background: location },
    });
  };

  return (
    <View style={styles.container}>
      <Header onSearchChange={handleSearchOnChange} />
      <Outlet />
    </View>
  );
}

const statusBarHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
  container: {
    paddingTop: statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

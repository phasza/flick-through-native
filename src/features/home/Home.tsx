import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import Header from '../../layout/Header';
import { Outlet } from 'react-router-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
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

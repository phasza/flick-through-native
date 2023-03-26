import React from 'react';
import { RouterProvider } from 'react-router-native'
import router from './layout/router';
import 'react-native-url-polyfill/auto';

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
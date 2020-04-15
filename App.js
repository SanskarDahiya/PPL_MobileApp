import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import store from './REDUX/store';
import HomePage from './Components/HomePage';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </NavigationContainer>
  );
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductScreen from './app/screens/ProductScreen';

const App: () => React$Node = () => {
  let RootStack = createStackNavigator();
  console.disableYellowBox = true;
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Product" component={ ProductScreen } />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;

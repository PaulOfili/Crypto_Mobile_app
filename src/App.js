/*!

 =========================================================
 * Material Kit React Native - v1.4.0
 =========================================================
 * Product Page: https://demos.creative-tim.com/material-kit-react-native/
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react-native/blob/master/LICENSE)
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
import {Platform, StatusBar, Image, View} from 'react-native';
import {Provider} from 'react-redux';
import {Block, GalioProvider} from 'galio-framework';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Images, products, materialTheme} from './constants/';

import {NavigationContainer} from '@react-navigation/native';
import Screens from './navigation/Screens';
import store from './store/index';

// Before rendering any navigation stack
import {enableScreens} from 'react-native-screens';
enableScreens();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

// cache product images
products.map(product => assetImages.push(product.image));

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <SafeAreaProvider>          
            <NavigationContainer>
              <GalioProvider theme={materialTheme}>
                <View style={{flex: 1}}>
                  {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                  <Screens />
                </View>
              </GalioProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      );
    }
  }
}

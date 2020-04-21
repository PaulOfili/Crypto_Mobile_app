import React, { useEffect } from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {Block, GalioProvider} from 'galio-framework';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Images, products, materialTheme} from './constants/';

import {NavigationContainer} from '@react-navigation/native';
import { navigationRef, isMountedRef } from './navigation/RootNavigation';
import Screens from './navigation/Screens';

import store from './store/index';

// Before rendering any navigation stack
// import {enableScreens} from 'react-native-screens';
// enableScreens();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

// cache product images
products.map(product => assetImages.push(product.image));

export default function App() {
 
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (

    <Provider store={store}>
      <SafeAreaProvider>          
          <GalioProvider theme={materialTheme}>
            <View style={{flex: 1}}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <NavigationContainer ref={navigationRef}>
                <Screens />
              </NavigationContainer>
            </View>
          </GalioProvider>
      </SafeAreaProvider>
    </Provider>
  );

}

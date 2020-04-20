import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {Block, Button, Text, theme} from 'galio-framework';
const {height, width} = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

function Onboarding({navigation}) {

  return (    
    <Block flex safe style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
      <Block flex center>
        <ImageBackground
          source={{uri: Images.Onboarding}}
          style={{height: height-100, width: width, marginTop: '-15%', zIndex: 1, opacity: 0.3}}
        />
      </Block>
      <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{zIndex: 2}}>
          <Block>
            <Block>
              <Text color="white" size={60}>
                Interswitch
              </Text>
            </Block>
            <Block row>
              <Text color="white" size={30}>
                Blockchain
              </Text>
            </Block>
            <Text size={16} color="rgba(255,255,255,0.6)">
              Banking in Africa made easy
            </Text>
          </Block>
          <Block center>
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => navigation.navigate('Login')}>
              GET STARTED
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

export default Onboarding
import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import {TouchableOpacity, StyleSheet, Platform, Dimensions} from 'react-native';
import {Button, Block, NavBar, Input, Text, theme} from 'galio-framework';
import { Icon } from './ArgonComponents';
import materialTheme from '../constants/Theme';

const {height, width} = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);


function Header({title, hasNext, previous, navigation}) {

  const isDrawerOpen = useIsDrawerOpen();

  const handleLeftPress = () => {
    return previous ? navigation.goBack() : navigation.openDrawer();
  };

  const renderNext = () => {    
    if (hasNext) {
      return (
        <TouchableOpacity>
          <Text>Next</Text>
        </TouchableOpacity>
      )
    }
    return null;
  }

  const renderLeft = () => {
    return (
      <TouchableOpacity onPress={handleLeftPress}>
        {(previous) ?
          <Icon
            size={24}
            color={materialTheme.COLORS.ICON}
            name="arrow-back"
            family="Material-Icons"
          /> 
          : isDrawerOpen ?
          <Icon 
          size={28}
          color={materialTheme.COLORS.ICON}
          name="close"
          family="AntDesign"
          />
          :
          <Icon
            size={20}
            color={materialTheme.COLORS.ICON}
            name="menu-fold"
            family="AntDesign"
          /> 
      }
      </TouchableOpacity>
    )
  }

  return (
    <Block>
      <NavBar
        title={title}
        style={styles.navbar}
        left={renderLeft()}
        right={renderNext()}
        rightStyle={{alignItems: 'center'}}
        leftStyle={{flex: 0.3, paddingTop: 2}}
        titleStyle={[
          styles.title,
        ]}
      />
    </Block>
  );
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 20,
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX() ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
    
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
  },
});

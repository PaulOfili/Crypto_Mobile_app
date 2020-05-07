import React from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {useSafeArea} from 'react-native-safe-area-context';

import {Icon, DrawerItem as DrawerCustomItem} from '../components';
import SignOutButton from '../components/SignOutButton';

function CustomDrawerContent({
  drawerPosition,
  navigation,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const screens = [
    'Balance',
    'Create Account',
    'Fund Account',
    'Transfer',
    'Withdraw',
  ];

  const userData = useSelector(store => store.auth.userData)
  const { firstName, lastName, email } = userData
  return (
    <Block
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <Block flex={0.25} style={styles.header}>
        <View
          // onPress={() => navigation.navigate('Profile')}
          >
          <Block style={styles.profile}>
            <Icon 
              size={100}
              name="user"
              family="EvilIcons"
              color='white'
            />
            <Text h5 color='white'>
              {firstName} {lastName}
            </Text>
            <Text muted color='white'>
              {email}
            </Text>
          </Block>
        </View>
      </Block>
      <Block flex={0.75} style={{paddingLeft: 7, paddingRight: 14, paddingTop: 7}}>
        <ScrollView
          contentContainerStyle={[
            {
              flex: 1,
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === 'left' ? insets.left : 0,
              paddingRight: drawerPosition === 'right' ? insets.right : 0,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Block flex style={{justifyContent: 'space-between'}} >
            <Block>
              {
                screens.map((item, index) => {
                  return (
                    <DrawerCustomItem
                      title={item}
                      key={index}
                      navigation={navigation}
                      focused={state.index === index ? true : false}
                    />
                  );
                })
              }
            </Block>
            <SignOutButton/>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#066995',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end',
  },
  profile: {
    alignItems: 'center',
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  }
});

export default CustomDrawerContent;

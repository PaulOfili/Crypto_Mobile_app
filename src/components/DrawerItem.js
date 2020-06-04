import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';

const proScreens = [
  'Woman',
  'Man',
  'Kids',
  'New Collection',
  'Sign In',
  'Sign Up',
];

class DrawerItem extends React.Component {
  renderIcon = () => {
    const {title, focused} = this.props;

    switch (title) {
      case 'Balance':
        return (
          <Icon
            size={25}
            name="account-balance-wallet"
            family="Material"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Create Account':
        return (
          <Icon
            size={25}
            name="account"
            family="Material-Community"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Deposit':
        return (
          <Icon
            size={25}
            name="bank-transfer-in"
            family="Material-Community"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Transfer':
        return (
          <Icon
            size={25}
            name="bank-transfer-out"
            family="Material-Community"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Withdraw':
        return (
          <Icon
            size={25}
            name="cash-multiple"
            family="Material-Community"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Profile':
        return (
          <Icon
            size={16}
            name="circle-10"
            family="GalioExtra"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Settings':
        return (
          <Icon
            size={16}
            name="gears"
            family="font-awesome"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Components':
        return (
          <Icon
            size={16}
            name="md-switch"
            family="ionicon"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Sign In':
        return (
          <Icon
            size={16}
            name="ios-log-in"
            family="ionicon"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Sign Up':
        return (
          <Icon
            size={16}
            name="md-person-add"
            family="ionicon"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      case 'Sign Out':
        return (
          <Icon
            size={30}
            name="md-person-remove"
            family="ionicon"
            color={focused ? 'white' : materialTheme.COLORS.MUTED}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const {focused, title, navigation} = this.props;

    return (
      <TouchableOpacity
        style={{height: 55}}
        onPress={() => {
          if (title === 'Transfer') {
            navigation.navigate('Transfer', { screen: 'TransferPage' })
          } else{
            navigation.navigate(title);
          }
        }}>
        <Block
          flex
          row
          style={[
            styles.defaultStyle,
            focused ? [styles.activeStyle, styles.shadow] : null,
          ]}>
          <Block flex={0.2} style={{marginRight: 2, justifyContent: 'center'}}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.8}>
            <Text
              size={18}
              color={
                focused
                  ? 'white'
                  : 'black'
              }>
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: '#066995',
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    // materialTheme.COLORS.MUTED
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36,
  },
});

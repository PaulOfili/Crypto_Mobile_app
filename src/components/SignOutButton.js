import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';
import { logoutUser } from '../store/actions/auth';


function SignOutButton() {
    const actionDispatch = useDispatch();
    const logoutUserDispatch = useCallback(() => actionDispatch(logoutUser()),[actionDispatch]);

    const renderIcon = () => {
        return (
            <Icon
            size={25}
            name="logout"
            family="AntDesign"
            color='red'
            />
        );    
    }

    return (
      <TouchableOpacity
        style={{height: 55}}
        onPress={logoutUserDispatch}>
        <Block
          flex
          row
          style={styles.defaultStyle}>
          <Block flex={0.2} style={{marginRight: 2, justifyContent: 'center'}}>
            {renderIcon()}
          </Block>
          <Block row center flex={0.8}>
            <Text size={18}>
              Sign out
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    )
};

export default SignOutButton;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

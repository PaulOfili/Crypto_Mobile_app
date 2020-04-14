import React from 'react';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Button, Block, Text, Input, theme} from 'galio-framework';

import {Icon, Product} from '../components';

const {width} = Dimensions.get('screen');
import products from '../constants/products';

import * as balanceRequest from '../store/actions/balance';
import store from '../store';

class Balance extends React.Component {
  componentDidMount = () => {
    this.props.getBalance();
  };

  renderCurrencies = () => {
    const firstBalance = this.props.balance.balance
      ? this.props.balance.balance[0].currencyName
      : '';
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{marginTop: 30}}>
          <Block flex row space="between" style={{padding: 30}}>
            <Block>
              <Text>{firstBalance}</Text>
            </Block>
            <Block>
              <Text>600.00</Text>
            </Block>
          </Block>
          <Block flex row space="between" style={{padding: 30}}>
            <Block>
              <Text>USD</Text>
            </Block>
            <Block>
              <Text>60.00</Text>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <ScrollView>
        <Block flex style={styles.balance}>
          <Text size={16}>Welcome back Tayo</Text>
          <Text size={16}>Account ID: GARS...WEIO</Text>
          {this.renderCurrencies()}
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  balance: {
    width: width,
    padding: 20,
    marginTop: 20,
  },
});

const mapStateToProps = state => {
  return {
    balance: state.balance.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBalance: () => dispatch(balanceRequest.getBalance()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Balance);

// export default Balance;

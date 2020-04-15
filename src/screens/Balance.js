import React from 'react';
import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Button, Block, Text, Input, theme} from 'galio-framework';

import {Icon, Product, Banner, CurrencyCard } from '../components';
import {materialTheme, products, Images} from '../constants/';

const {width} = Dimensions.get('screen');
// import products from '../constants/products';

import * as balanceRequest from '../store/actions/balance';
import store from '../store';
import Container from '../layouts/Container';

class Balance extends React.Component {
  componentDidMount = () => {
    this.props.getBalance();
  };

  renderCurrencies = () => {
    const firstBalance = this.props.balance.balance
      ? this.props.balance.balance[0].currencyName
      : '';
    return (
        <View style={styles.balanceList}>
          <CurrencyCard />
          <CurrencyCard />
          <CurrencyCard />          
          <CurrencyCard />          
          <CurrencyCard />          
          <CurrencyCard />          
        </View>
        
    );
  };

  render() {
    return (
      <Container>
        <Block style={styles.balance}>
          <Banner />   
          <View style={styles.balanceStatsContainer}>
            <Text style={styles.balanceStatTitle}>Balance</Text>
          </View>    
             
          {this.renderCurrencies()}
        </Block>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  balance: {
    width: width*0.95,
    // height: '100%',
    alignSelf: 'center',
    // borderRadius: 7,
    elevation: 1,
    paddingBottom: 40
  },

  balanceStatsContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  balanceStatTitle: {
    fontSize: 30,
    borderBottomWidth: 3,
    borderBottomColor: "#9C26B0"
  },
  
  balanceList: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
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

import React from 'react';
import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Button, Block, Text, Input, theme} from 'galio-framework';

import {Icon, Product, Banner, CurrencyCard } from '../components';
import {materialTheme, products, Images} from '../constants/';

const {width} = Dimensions.get('screen');
const cardWidth = (width - 60) / 2;
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
      <Block
            row
            space="between"
            style={styles.balanceList}>
            {[1,2,3,4,5,6,7].map((_, index) => (
              <Block key={`viewed-${index}`} style={styles.eachCard}>
                <CurrencyCard/>
              </Block>
            ))}
          </Block>
        
    );
  };

  render() {
    return (
      <Container>
        <Block style={styles.balance}>
          <Banner />   
          <View style={styles.balanceStatsContainer}>
            <Text  style={styles.balanceStatTitle}>All Cyptos</Text>
          </View>    
            {this.renderCurrencies()}
             
        </Block>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  balance: {
    width: width,
    paddingBottom: 40
  },

  balanceStatsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  balanceStatTitle: {
    fontSize: 13,
    color: '#2196e6'
  },
  
  balanceList: {
    paddingTop: 20,
    flexWrap: 'wrap',
    marginHorizontal: theme.SIZES.BASE,
    // borderWidth: 3
  },
  eachCard: {
    // borderWidth: 4,
    marginVertical: 4,
    width: cardWidth,
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

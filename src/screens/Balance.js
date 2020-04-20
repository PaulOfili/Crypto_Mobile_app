import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Button, Block, Text, Input, theme} from 'galio-framework';

import {Icon, Product, Banner, CurrencyCard } from '../components';
import {materialTheme, products, Images} from '../constants/';

const {width} = Dimensions.get('screen');
const cardWidth = (width - 60) / 2;
// import products from '../constants/products';

import { getBalance } from '../store/actions/balance';
import Container from '../layouts/Container';

function Balance(props) {
  
  const balance = useSelector((store) => store.balance)

  const actionDispatch = useDispatch();
  const getBalanceDispatch = useCallback(() => actionDispatch(getBalance()),[actionDispatch]);
  
  useEffect(() => {
    getBalanceDispatch();
  }, [getBalanceDispatch])

  const renderCurrencies = () => {
    const balanceList = balance.data
    console.log(balanceList);

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

  return (
    <Container>
      <Block style={styles.balance}>
        <Banner />   
        <View style={styles.balanceStatsContainer}>
          <Text  style={styles.balanceStatTitle}>All Cyptos</Text>
        </View>    
          {renderCurrencies()}
      </Block>
    </Container>
    
  );
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

export default Balance;

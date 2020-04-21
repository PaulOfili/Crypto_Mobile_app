import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';

import {Icon, Product, Banner, CurrencyCard } from '../components';
import {materialTheme, products, Images} from '../constants/';
import Container from '../layouts/Container';

import { getBalance } from '../store/actions/balance';

const {width} = Dimensions.get('screen');
const cardWidth = (width - 60) / 2;

function Balance(props) {
  
  const userData = useSelector((store) => store.auth.userData)
  const balance = useSelector((store) => store.balance)

  const actionDispatch = useDispatch();
  const getBalanceDispatch = useCallback(() => actionDispatch(getBalance()),[actionDispatch]);
  // const getAllAccountsDispatch = useCallback(() => actionDispatch(getAllAccounts()),[actionDispatch]);

  useFocusEffect(() => {
    getBalanceDispatch();
    // getAllAccountsDispatch();
  }, [])

  const renderCurrencies = () => {
    const balanceList = balance.data

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

  // const cardColors = ['#0082BA', '#00C590']
  const cardColors = ['#0082BA']

  const checkFirstElement = (n) => {
    return n === 0
  }
  
  const checkLastlement = (n) => {
    return n === cardColors.length - 1 && cardColors.length > 1
  }
  return (
    <Container>
      <Block style={styles.balance}>
        <Banner userData={userData}/> 
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountList}> 
          {
            cardColors.map((color, index) => (
              <Block key={`accountCard-${index}`} style={[styles.accountCard, { 
                backgroundColor: color,
                marginLeft: checkFirstElement(index) ? 25 : 10 ,
                marginRight: checkLastlement(index) ? 25 : 0
                }]}>
                <Text style={[styles.accountCard__name, {color: 'white'}]}>First wallet</Text>
                <Text style={[styles.accountCard__number, {color: 'white'}]}>
                  FFFE...GGDG
                </Text>
              </Block> 
            ))
          }
        </ScrollView>
        
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
    paddingBottom: 40,
    flex: 1
  },

  accountList: {
    position: 'absolute',
    top: 150,
  },

  accountCard: {
    height: 120,
    width: 300,
    borderRadius: 4,
    width: width - 50,
    // alignSelf: 'center',
    borderWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,

  },

  accountCard__name: {
    fontSize: 18,
    marginBottom: 5
  },

  accountCard__number: {
    fontSize: 12
  },
  
  balanceStatsContainer: {
    marginTop: 100,
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

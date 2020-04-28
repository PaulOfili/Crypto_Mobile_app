import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, Dimensions, View, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';

import {Icon, Product, Banner, CurrencyCard } from '../components';
import {materialTheme, products, Images} from '../constants/';
import Container from '../layouts/Container';
import Toast from '../components/Toast';
import { getBalance } from '../store/actions/balance';

const {width} = Dimensions.get('screen');
const cardWidth = (width - 60) / 2;

function Balance(props) {
  
  const toastRef = useRef();

  const userData = useSelector((store) => store.auth.userData)
  const balance = useSelector((store) => store.balance)

  const actionDispatch = useDispatch();
  const getBalanceDispatch = useCallback((email) => actionDispatch(getBalance(email)), [actionDispatch]);

  useEffect(() => {
    getBalanceDispatch('paul@gmail.com')
  }, [getBalanceDispatch])

  useEffect(() => {
    if (balance.error) {
      toastRef.current.openToast();
    }
  }, [balance.error])

  useFocusEffect(
    useCallback(() => {
      console.log(toastRef)
      if (balance.error) {
        toastRef.current.openToast();
      }
    },[balance.error])
  );

  const onRefresh = useCallback(() => {
    getBalanceDispatch('paul@gmail.com')
  })

  const renderCurrencies = () => {
    const balanceList = balance.data

    if (balanceList && balanceList.balance) {
      return (
        <Block
              row
              space="between"
              style={styles.balanceList}>
              {balanceList.balance.map((each_balance, index) => (
                <Block key={`viewed-${index}`} style={styles.eachCard}>
                  <CurrencyCard balanceData={each_balance}/>
                </Block>
              ))}
            </Block>
          
      );
    } else {
      return (
        <Block safe middle style={{ marginTop: 80}}>
          <Text>No currency yet. Create an account </Text>
          <View style={{marginTop: 30}}>
            <Icon size={40} family='Material-Community' name='account-plus'/>
          </View>
        </Block>
      )
    }
  };

  // const cardColors = ['#0082BA', '#00C590']
  const cardColors = ['#0082BA']

  const checkFirstElement = (n) => {
    return n === 0
  }
  
  const checkLastlement = (n) => {
    return n === cardColors.length - 1 && cardColors.length > 1
  }

  // if (balance.isLoading) {
  //   return (
  //     <Block flex safe middle>
  //       <ActivityIndicator size='large'/>
  //     </Block>
  //   )
  // }
  const publicKey = balance.data.publicKey;
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={balance.isLoading} onRefresh={onRefresh} />
        }
      >
        <Block style={styles.balance}>
          <Banner userData={userData}/> 
          {
            (publicKey) && (
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
                        {publicKey.substring(0,4) + '...' + publicKey.substring(publicKey.length-4, publicKey.length)}
                      </Text>
                    </Block> 
                  ))
                }
              </ScrollView>
            )
          }
          <View style={styles.balanceStatsContainer}>
            <Text  style={styles.balanceStatTitle}>All Cyptos</Text>
          </View>    
            {renderCurrencies()}
        </Block>
      </ScrollView>
      <Toast ref={toastRef} text={balance.error}/>
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

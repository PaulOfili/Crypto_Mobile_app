import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  Picker,
  Alert,
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
import { Input as Input2, Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';
import Toast from '../components/Toast';
import { getCurrencies } from '../store/actions/commonData';
import { postFundAccount } from '../store/actions/trade';
import { WebView } from 'react-native-webview';
import IswMobileSdk, { IswPaymentInfo, Environment, IswSdkConfig } from 'react-native-isw-mobile-sdk';
import cuid from 'cuid';

// get your credentials
const merchantId = "IKIA67ED34E2A0FF344EAAED7B7CE06A6C3C9D609BBA",
 merchantCode = "MX13712",
 merchantSecret = "J9n/3deZBnSJMJrdj1fPtO4CUCWX4HnepShsqaDUt+Q=",
 currencyCode = "566"; // e.g. 566

// create configuration for payment
// using the credentials

const config = new IswSdkConfig(
    merchantId, 
    merchantSecret,
    merchantCode,
    currencyCode
)


/**
 *  callback function for initialized sdk
 *  @param isSuccessful boolean flag indicating the result of initializing sdk
 */

const onSdkInitialized = (isSuccessful) => {
    // handle result
    console.log('Initialized: ', isSuccessful)
}

// initialize the sdk at the start of application
// you can point to a specific environment -> TEST || PRODUCTION
const env = Environment.TEST;
IswMobileSdk.initialize(config, env, onSdkInitialized);
const {width} = Dimensions.get('screen');

function FundAccount({navigation}) {

  const toastRef = useRef();

  const currencies = useSelector((store) => store.commonData.currencies)
  const userData = useSelector((store) => store.auth.userData)
  const fundIsLoading = useSelector(store => store.trade.fund.isLoading)

  const actionDispatch = useDispatch();
  const getCurrenciesDispatch = useCallback(() => actionDispatch(getCurrencies()), [actionDispatch]);
  const postFundAccountDispatch = useCallback((data) => actionDispatch(postFundAccount(data)),[actionDispatch]);

  const [buyCurrencyType, setBuyCurrencyType] = useState('')
  const [amount, setAmount] = useState('0');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    getCurrenciesDispatch()
  }, [ getCurrenciesDispatch])

  useEffect(() => {
    if (currencies.error) {
      toastRef.current.openToast();
    }
  }, [currencies.error])

  useFocusEffect(
    useCallback(() => {
      if (currencies.error) {
        toastRef.current.openToast();
      }
    },[currencies.error])
  );

  const onRefresh = useCallback(() => {
    getCurrenciesDispatch();
  })

  const onMemoChange = (newMemo) => {
    setMemo(newMemo)
  }
  
  const makePayment = () => {
    if (buyCurrencyType &&
        amount && parseFloat(amount) !== 0) {

          const customerId = userData.email;
          const customerName = userData.firstName;
          const customerEmail = userData.email;
          const customerMobile = '08011223344';
          const reference = cuid();
          const payableAmount = amount * 100;
          console.log(reference)
          const paymentInfo = new IswPaymentInfo(
            customerId,
            customerName,
            customerEmail,
            customerMobile,
            reference,
            payableAmount
          )
      
          const userDidComplete = result => {
            console.log(result);
            if (result.isSuccessful) {
              fundAccount();
            }
          }

          const userDidCancel = () => {
            console.log('The user cancelled the process!');
          }

          IswMobileSdk.pay(paymentInfo, userDidComplete, userDidCancel);

    } else {
      Alert.alert('Please complete all fields properly!')
    }
  }

  const fundAccount = () => {
    const requestBody = {
      email: userData.email,
      currencyToBuy: buyCurrencyType,
      amount,
      memo: memo.trim()
    };

    postFundAccountDispatch(requestBody);
  };

  const renderBuyCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Choose currency to Buy:</Text>
        <Picker
          selectedValue={buyCurrencyType}
          onValueChange={(itemValue, itemIndex) =>
            setBuyCurrencyType(itemValue)
          }>
            <Picker.Item label='Pick a currency' value='' />
           {currencies.data.map(currency => (
              <Picker.Item 
                key={currency.id} 
                label={currency.currencyName}
                value={currency.currencyCode} />
            ))}
        </Picker>
      </View>
    );
  };

  if (fundIsLoading) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff"/>
            <Text style={{marginTop: 15}}>Processing Transaction</Text>
        </View>
    )
}

  return (
    <Container>   
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={currencies.isLoading} onRefresh={onRefresh} />
        }
      >
        <Block flex style={styles.fund}>
          {renderBuyCurrencyPicker()}
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>Amount to buy:</Text>
            <Input2
              value={amount}
              onChangeText={text => setAmount(text)}
              placeholder='Enter amount'
              inputContainerStyle={styles.inputField}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.memoContainer}>
            <Text style={styles.memoText}>Memo:</Text>
            <Input2
              value={memo}
              maxLength={28}
              onChangeText={text => onMemoChange(text)}
              placeholder='Must be at most 28 characters long'
              inputContainerStyle={styles.inputField}
            />
          </View>
          <Button2
            buttonStyle={styles.fundButton}
            title="Fund Account"
            onPress={makePayment}
          />
        </Block>
      </ScrollView>
      <Toast ref={toastRef} text={currencies.error}/>
    </Container>
  );
}
const styles = StyleSheet.create({
  fund: {
    width: width,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  currencyPicker: {
    marginBottom: 20,
  },
  inputField: {
    borderColor: '#2196e6',
    marginBottom: 30,
  },
  fundButton: {
    marginTop: 30
  }
});

export default FundAccount;
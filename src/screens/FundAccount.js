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
  ScrollView
} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
import { Input as Input2, Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';
import Toast from '../components/Toast';
import { checkMinimumLength } from '../utilities/formValidation'
import { getCurrencies } from '../store/actions/commonData';
import { postFundAccount } from '../store/actions/trade';

const {width} = Dimensions.get('screen');

function FundAccount(props) {

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
  const [memoError, setMemoError] = useState(false);

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

    setMemoError(!checkMinimumLength(newMemo))
  }
  
  const fundAccount = () => {
    
    const requestBody = {
      email: userData.email,
      currencyToBuy: buyCurrencyType,
      amount,
      memo: memo.trim()
    };

    if (buyCurrencyType &&
        amount && parseFloat(amount) !== 0 &&
        memo && !memoError) {
          postFundAccountDispatch(requestBody);
        } else {
          Alert.alert('Please complete all fields properly!')
        }
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
              inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.memoContainer}>
            <Text style={styles.memoText}>Memo:</Text>
            <Input2
              value={memo}
              onChangeText={text => onMemoChange(text)}
              placeholder='Must be at least 5 characters long'
              inputContainerStyle={[styles.inputField, {borderColor: (memoError) ? 'red' : '#2196e6'}]}
            />
          </View>
          <Button2
            loading={fundIsLoading}
            buttonStyle={styles.fundButton}
            title="Fund Account"
            onPress={fundAccount}
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
    borderColor: theme.COLORS.INFO,
    marginBottom: 40,
  },
  fundButton: {
    marginTop: 20
  }
});

export default FundAccount;
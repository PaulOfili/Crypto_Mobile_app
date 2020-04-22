import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getBanks, getCurrencies } from '../store/actions/commonData';
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

const {width} = Dimensions.get('screen');
const mockCurrencies = [
  {
    id: 0,
    label: 'Naira',
    value: 'naira',
  },
  {
    id: 1,
    label: 'Bitcoin',
    value: 'bitcon',
  },
  {
    id: 2,
    label: 'Crypto',
    value: 'crypto',
  },
];
function Transfer (props) {

  const banks = useSelector((store) => store.commonData.banks)
  const currencies = useSelector((store) => store.commonData.currencies)

  const [currencyType, setCurrencyType] = useState('')


  const actionDispatch = useDispatch();
  const getBanksDispatch = useCallback(() => actionDispatch(getBanks()), [actionDispatch]);
  const getCurrenciesDispatch = useCallback(() => actionDispatch(getCurrencies()), [actionDispatch]);

  useEffect(() => {
    getBanksDispatch()
    getCurrenciesDispatch()
  }, [getBanksDispatch, getCurrenciesDispatch])

  const onRefresh = useCallback(() => {
    getBanksDispatch();
    getCurrenciesDispatch();
  })

  const makeTransfer = () => {
    Alert.alert('Transfer has been activated!!');
  };

  const renderCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Choose account to debit</Text>
        <Picker
          selectedValue={currencyType}
          onValueChange={(itemValue, itemIndex) =>
            setCurrencyType(itemValue)
          }>
          {mockCurrencies.map(currency => (
            <Picker.Item
              key={currency.id}
              label={currency.label}
              value={currency.value}
            />
          ))}
        </Picker>
      </View>
    );
  };

  // if (banks.isLoading || currencies.isLoading) {
  //   return (
  //     <Block flex safe middle>
  //       <ActivityIndicator size='large'/>
  //     </Block>
  //   )
  // }

  return (
    <Container>   
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={banks.isLoading || currencies.isLoading} onRefresh={onRefresh} />
        }
      >
        <Block flex style={styles.transfer}>
          {renderCurrencyPicker()}
          <View style={styles.recipientContainer}>
            <Text style={styles.recipientText}>Recipient:</Text>
            <Input2
              placeholder='Receiver email or public key'
              inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
            />
            {/* <Input
              placeholder="Receiver email or public key"
              color={theme.COLORS.INFO}
              style={styles.inputField}
            /> */}
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>Amount to send:</Text>
            <Input2
              placeholder='Receiver email or public key'
              inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
            />
          </View>
          <View style={styles.memoContainer}>
            <Text style={styles.memoText}>Memo:</Text>
            <Input2
              placeholder='Receiver email or public key'
              inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
            />
          </View>
          <Button2
            buttonStyle={styles.transferButton}
            title="Transfer"
            onPress={makeTransfer}
          />
        </Block>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  transfer: {
    width: width,
    padding: 20,
    marginTop: 20,
  },
  currencyPicker: {
    marginTop: 30,
    marginBottom: 15,
  },
  inputField: {
    borderColor: theme.COLORS.INFO,
    marginBottom: 30,
  },
  transferButton: {
    marginTop: 20,
  },
});

export default Transfer;
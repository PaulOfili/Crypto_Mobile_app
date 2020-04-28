import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Alert,
  View,
  RefreshControl,
  Text
} from 'react-native';
import {Button, Block, theme, Checkbox} from 'galio-framework';
import { Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';
import { getCurrencies } from '../store/actions/commonData';
import { postCreateAccount } from '../store/actions/account';
import { CurrencyCard } from '../components';
import Toast from '../components/Toast';

const {width} = Dimensions.get('screen');

function CreateAccount(props) {

  const toastRef = useRef();

  const createAccountLoading = useSelector((store) => store.account.isLoading)
  const currencies = useSelector((store) => store.commonData.currencies)

  const actionDispatch = useDispatch();
  const postCreateAccountDispatch = useCallback((data) => actionDispatch(postCreateAccount(data)),[actionDispatch]);
  const getCurrenciesDispatch = useCallback(() => actionDispatch(getCurrencies()), [actionDispatch]);

  const [currencyType, setCurrencyType] = useState('')
  const [acceptTermsChecked, setAcceptTermsChecked] = useState(false)

  useEffect(() => {
    getCurrenciesDispatch()
  }, [getCurrenciesDispatch])

  useEffect(() => {
    if (currencies.error) {
      toastRef.current.openToast();
    }
  }, [currencies.error])

  useFocusEffect(
    useCallback(() => {
      console.log(toastRef)
      if (currencies.error) {
        toastRef.current.openToast();
      }
    },[currencies.error])
  );

  const onRefresh = useCallback(() => {
    getCurrenciesDispatch()
  })

  const toggleCheckbox = () => {
    setAcceptTermsChecked(!acceptTermsChecked);
  };

  const createAccount = () => {
    if (currencyType == '') {
      Alert.alert('Pick a currency before proceeding!')
    } else {
      const requestBody = {
        email: "paul@gmail.com",
        currencyCode: currencyType
      }

      postCreateAccountDispatch(requestBody)
    }
  };

  const renderCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Currency</Text>
        <Picker
          selectedValue={currencyType}
          onValueChange={(itemValue, itemIndex) =>
            setCurrencyType(itemValue)
          }>
            <Picker.Item label='Pick a currency' value='' />
            {currencies.data.map(currency => (
              <Picker.Item key={currency.id} label={currency.currencyName} value={currency.currencyCode} />
            ))}
        </Picker>
      </View>
    );
  };

  // if (currencies.isLoading) {
  //   return (
  //     <Block flex safe middle>
  //       <ActivityIndicator size='large'/>
  //     </Block>
  //   )
  // }
  return (
    
    <Container>
      
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={currencies.isLoading} onRefresh={onRefresh} />
        }
      >
        
        <Block flex style={styles.createAccount}>
          {renderCurrencyPicker()}
          <View style={styles.checkboxContainer}>
            <Checkbox
              label="I accept policy terms and conditions"
              color="success"
              // initialValue={false}
              value={acceptTermsChecked}
              onChange={() => toggleCheckbox()}
            />
          </View>
          <Button2
            disabled={acceptTermsChecked}
            loading={createAccountLoading}
            buttonStyle={styles.createAccountButton}
            title="Create Account"
            onPress={createAccount}
          />
        </Block>
      </ScrollView>
      
    <Toast ref={toastRef} text={currencies.error}/>
    </Container>
  );
}

const styles = StyleSheet.create({
  createAccount: {
    width: width,
    padding: 20,
    marginTop: 2,
  },
  currencyPicker: {
    marginTop: 40,
    marginBottom: 50,
  },
  checkboxContainer: {
    marginBottom: 30,
  },
  createAccountButton: {
    marginTop: 50,
    backgroundColor: '#4CAF50'
  }
});

export default CreateAccount;
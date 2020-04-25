import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
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
import Toast from 'react-native-tiny-toast';
import { getCurrencies } from '../store/actions/commonData';
import { postCreateAccount } from '../store/actions/account';

const {width} = Dimensions.get('screen');
const mockCurrencies = [
  {
    label: 'Naira',
    value: 'naira',
  },
  {
    label: 'Bitcoin',
    value: 'bitcoin',
  },
  {
    label: 'Crypto',
    value: 'crypto',
  },
];

function CreateAccount(props) {

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

  const onRefresh = useCallback(() => {
    getCurrenciesDispatch()
  })

  const toggleCheckbox = () => {
    setAcceptTermsChecked(!acceptTermsChecked);
  };

  const createAccount = () => {
    postCreateAccountDispatch('test')
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
          {mockCurrencies.map(currency => (
            <Picker.Item label={currency.label} value={currency.value} />
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
      {/* <Toast
        mask
        visible={true}
        position={-0.1} 
        shadow={true}
        containerStyle={{backgroundColor: 'red', borderRadius: 0, paddingTop: 20, opacity: 0.2}}
        // animation={true}
        // hideOnPress={true}
    >Error retrieving data. Check your connectivitity or try again.</Toast> */}
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
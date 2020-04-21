import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Alert,
  View,
  Switch,
} from 'react-native';
import {Button, Block, Text, theme, Checkbox} from 'galio-framework';
import { Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';
import { postCreateAccount } from '../store/actions/account';

const {width} = Dimensions.get('screen');
const currencies = [
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

  const actionDispatch = useDispatch();
  const postCreateAccountDispatch = useCallback((data) => actionDispatch(postCreateAccount(data)),[actionDispatch]);

  const [currencyType, setCurrencyType] = useState()
  const [acceptTermsChecked, setAcceptTermsChecked] = useState(false)

  const toggleCheckbox = () => {
    setAcceptTermsChecked(!acceptTermsChecked);
  };

  const createAccount = () => {
    // Alert.alert(`Selected is ${currencyType} !!`);
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
          {currencies.map(currency => (
            <Picker.Item label={currency.label} value={currency.value} />
          ))}
        </Picker>
      </View>
    );
  };

  return (
    <Container>
      <Block flex style={styles.createAccount}>
        {renderCurrencyPicker()}
        <View style={styles.checkboxContainer}>
          <Checkbox
            label="I accept policy terms and conditions"
            color="success"
            initialValue={false}
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
    </Container>
  );
}

const styles = StyleSheet.create({
  createAccount: {
    width: width,
    padding: 20,
    marginTop: 10,
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
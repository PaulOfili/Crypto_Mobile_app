import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Alert,
  View,
  Switch,
} from 'react-native';
import {Button, Block, Text, Input, theme, Checkbox} from 'galio-framework';

const {width} = Dimensions.get('screen');
const currencies = [
  {
    label: 'Naira',
    value: 'naira',
  },
  {
    label: 'Bitcoin',
    value: 'bitcon',
  },
  {
    label: 'Crypto',
    value: 'crypto',
  },
];
export default class CreateAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      currencyType: '',
      acceptTermsChecked: false,
    };
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({
      acceptTermsChecked: !prevState.acceptTermsChecked,
    }));
  };

  createAccount = () => {
    console.log(this.state);
    Alert.alert(`Selected is ${this.state.currencyType} !!`);
  };

  renderCurrencies = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Currency</Text>
        <Picker
          selectedValue={this.state.currencyType}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({currencyType: itemValue})
          }>
          {currencies.map(currency => (
            <Picker.Item label={currency.label} value={currency.value} />
          ))}
        </Picker>
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        <Block flex style={styles.createAccount}>
          <Text size={16}>Welcome back Tayo</Text>
          <Text size={16}>Account ID: GARS...WEIO</Text>
          {this.renderCurrencies()}
          <View style={styles.checkboxContainer}>
            <Checkbox
              label="I accept policy terms and conditions"
              color="success"
              initialValue={false}
              onChange={() => this.toggleCheckbox()}
            />
          </View>
          <Button
            // disabled={this.state.acceptTermsChecked}
            round
            uppercase
            color="success"
            // onPress={this.createAccount}>
            onPress={() => this.props.navigation.navigate('Test')}>
            Create Account
          </Button>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  createAccount: {
    width: width,
    padding: 20,
    marginTop: 20,
  },
  currencyPicker: {
    marginTop: 40,
    marginBottom: 50,
  },
  checkboxContainer: {
    marginBottom: 30,
  },
});

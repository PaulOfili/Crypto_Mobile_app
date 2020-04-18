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
import {Button, Block, Text, theme, Checkbox} from 'galio-framework';
import Container from '../layouts/Container';
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

  renderCurrencyPicker = () => {
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
      <Container>
        <Block flex style={styles.createAccount}>
          {this.renderCurrencyPicker()}
          <View style={styles.checkboxContainer}>
            <Checkbox
              label="I accept policy terms and conditions"
              color="info"
              initialValue={false}
              onChange={() => this.toggleCheckbox()}
            />
          </View>
          <Button
            disabled={this.state.acceptTermsChecked}
            round
            uppercase
            color="success"
            // onPress={this.createAccount}>
            onPress={() => this.props.navigation.navigate('Test')}>
            Create Account
          </Button>
        </Block>
      </Container>
    );
  }
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
});

import React, {useState, useCallback} from "react";
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components/ArgonComponents";
import { Button as Button2 } from 'react-native-elements';
import { Images, argonTheme } from "../constants/ArgonConstants";
import { signUpUser, loginUser } from '../store/actions/auth';
import { checkEmail, checkPhoneNumber, checkConfirmPassword } from '../utilities/formValidation';
import * as API_URLS from '../services/constants';
const { width, height } = Dimensions.get("screen");

function Register({navigation}) {
  
  const actionDispatch = useDispatch();
  const loginUserDispatch = useCallback((data) => actionDispatch(loginUser(data)),[actionDispatch]);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [acceptTermsChecked, setAcceptTermsChecked] = useState(false)

  const toggleCheckbox = () => {
    setAcceptTermsChecked(!acceptTermsChecked);
  };

  const onEmailChange = (newEmail) => {
    setEmail(newEmail)
    setEmailError(false)
  }

  const onEmailBlur = () => {
    setEmailError(!checkEmail(email))
  }

  const onPhoneNumberChange = (newPhone) => {
    setPhone(newPhone)
    setPhoneError(false)
  }

  const onPhoneBlur = () => {
    setPhoneError(!checkPhoneNumber(phone))
  }

  const onPasswordChange = (newPassword) => {
    setPassword(newPassword)
    setConfirmPasswordError(!checkConfirmPassword(newPassword, confirmPassword))
    // setPasswordError(!checkPassword(newPassword))
  }

  const onConfirmPasswordChange = (newConfirmPassword) => {
    setConfirmPassword(newConfirmPassword)
    setConfirmPasswordError(!checkConfirmPassword(password, newConfirmPassword))
  }

  const onSignUp = () => {
    const requestBody = {
      username: email,
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      mobileNo: phone
    }
    if (firstName && lastName && 
        email && !emailError && 
        phone && !phoneError && 
        password && !passwordError && 
        confirmPassword && !confirmPasswordError) {
        
        let url = API_URLS.SIGNUP_USER        
        return fetch(url,  { 
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        })
        .then((response) => {
            return response.json()
        })
        .then(responseData => {
          console.log('response', responseData)
          if (responseData) {
            if (responseData.message && responseData.message === 'successful'){
              loginUserDispatch({email, password})
            } 
            else {
              const errorMessage = responseData.message || responseData.description
              Alert.alert(errorMessage)
            }
          }
        })
        .catch((error) => {
            console.log('error', error);
        });
    } else {
      Alert.alert("Complete all fields")
    }
  }
  return (
    <Block flex middle>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.12} middle>
                <Text color="#8898AA" size={12}>
                  Join us 
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                  
                  
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>                    
                      <Block row style={{ width: width*0.8, marginBottom: 10 }}>
                        <Block flex style={{marginRight: 4}}>
                          <Input
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                            borderless
                            placeholder="First Name"
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="user"
                                family="AntDesign"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block flex style={{marginLeft: 4}} >
                          <Input
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                            borderless
                            placeholder="Last Name"
                            iconContent={null}
                          />
                        </Block>
                      </Block>
                      <Block style={{ width: width*0.8, marginBottom: 10 }}>
                        <Input
                          error={emailError}
                          value={email}
                          onChangeText={text => onEmailChange(text)}
                          onBlur={onEmailBlur}
                          // borderless
                          placeholder="Email"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="email-outline"
                              family="Material-Community"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block style={{ width: width*0.8, marginBottom: 10 }}>
                        <Input
                          error={phoneError}
                          value={phone}
                          onChangeText={text => onPhoneNumberChange(text)}
                          onBlur={onPhoneBlur}
                          type='number-pad'
                          // borderless
                          placeholder="Phone"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="phone"
                              family="AntDesign"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block style={{ width: width*0.8, marginBottom: 10 }}>
                        <Input
                          error={passwordError}
                          value={password}
                          onChangeText={text => onPasswordChange(text)}
                          // onBlur={onPasswordBlur}
                          password
                          // borderless
                          placeholder="Password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="lock"
                              family="AntDesign"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          error={confirmPasswordError}
                          value={confirmPassword}
                          onChangeText={text => onConfirmPasswordChange(text)}
                          password
                          // borderless
                          placeholder="Confirm Password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="lock"
                              family="AntDesign"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block row width={width * 0.75}>
                        <Checkbox
                          value={acceptTermsChecked}
                          onChange={() => toggleCheckbox()}
                          checkboxStyle={{
                            borderWidth: 3
                          }}
                          color={argonTheme.COLORS.PRIMARY}
                          label="I agree with the"
                        />
                        <Button
                          style={{ width: 100, elevation: 0 }}
                          color="transparent"
                          textStyle={{
                            color: argonTheme.COLORS.PRIMARY,
                            fontSize: 14
                          }}
                        >
                          Privacy Policy
                        </Button>
                      </Block>
                      <Block middle>
                        <Button2
                          disabled={acceptTermsChecked}
                          buttonStyle={styles.signUpButton}
                          title="Sign Up"
                          onPress={onSignUp}
                        />
                      </Block>
                      <Block middle width={width * 0.75}>
                        <Button
                          onPress={() => navigation.navigate('Login')}
                          style={{ width: 180, elevation: 0, marginTop: 10 }}
                          color="transparent"
                          textStyle={{
                            color: argonTheme.COLORS.PRIMARY,
                            fontSize: 14
                          }}
                        >
                          <Block row>
                            <Text muted>Already have an account?</Text>
                            <Text style={{marginLeft: 15}} >Login here</Text>
                          </Block>
                        </Button>
                      </Block>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  signUpButton: {
    width: width * 0.5,
    marginTop: 15,
    backgroundColor: argonTheme.COLORS.PRIMARY
  },
});

export default Register;

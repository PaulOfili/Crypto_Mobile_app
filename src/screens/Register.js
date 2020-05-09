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
import { postSignUp } from '../services/auth.service';
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
  const [registerLoading, setRegisterLoading] = useState(false)

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
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password,
      confirmPassword,
      email,
      mobileNo: phone
    }
    if (firstName && lastName && 
        email && !emailError && 
        phone && !phoneError && 
        password && 
        confirmPassword && !confirmPasswordError) {
        
        setRegisterLoading(true);

        let url = API_URLS.SIGNUP_USER   
        return postSignUp(requestBody)
          .then(responseData => {
            setRegisterLoading(false)
            if (responseData.message && responseData.message === 'successful'){
              loginUserDispatch({email, password})
            } else {
              const errorMessage = responseData.message || responseData.description
              Alert.alert(errorMessage)
            }
          }) 
          .catch(error => {
            setRegisterLoading(false)
            Alert.alert(error.message)
          })    
    } else {
      Alert.alert("Please complete all fields properly!")
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
                            borderless
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
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
                            borderless
                            value={lastName}
                            onChangeText={text => setLastName(text)}
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
                          value={password}
                          onChangeText={text => onPasswordChange(text)}
                          password
                          viewPass
                          bottomHelp
                          help={<Text style={{color: argonTheme.COLORS.MUTED}}>Password must contain alphanumeric, uppercase and special characters and must be between 8 - 20 characters long.</Text>}
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
                          viewPass
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
                          style={{ width: 80, elevation: 0 }}
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
                          loading={registerLoading}
                          disabled={acceptTermsChecked || registerLoading}
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

import React from 'react';
import { useSelector } from 'react-redux';
import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import BalanceScreen from '../screens/Balance';
import CreateAccountScreen from '../screens/CreateAccount';
import FundAccountScreen from '../screens/FundAccount';
import TransferScreen from '../screens/Transfer';
import WithdrawScreen from '../screens/Withdraw';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login'
import ComponentsScreen from '../screens/Components';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';

import CustomDrawerContent from './Menu';
import {Icon, Header} from '../components';
import {Images, materialTheme} from '../constants';

const {width} = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  name: 'Paul Ofili',
};

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({navigation, scene}) => (
            <Header
              white
              transparent
              title="Profile"
              scene={scene}
              navigation={navigation}
            />
          ),
          // headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function BalanceStack(props) {
  return (
    <Stack.Navigator initialRouteName="Balance" mode="card" headerMode="screen">
      <Stack.Screen
        name="Balance"
        component={BalanceScreen}
        options={{
          header: ({navigation, scene}) => (
            <Header
              transparent
              title="Balance"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function CreateAccountStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Create Account"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Create Account"
        component={CreateAccountScreen}
        options={{
          header: ({navigation, scene}) => (
            <Header
              transparent
              title="Create Account"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerLeft: ({navigation}) => (
            <Button onPress={() => navigation.goBack()} title='Go back' />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function FundAccountStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Fund Account"
        component={FundAccountScreen}
        options={{
          header: ({navigation, scene}) => (
            <Header 
              title="Fund Account" 
              scene={scene} 
              navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function TransferStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Transfer Funds"
              scene={scene}
              navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function WithdrawStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Withdraw Funds"
              scene={scene}
              navigation={navigation}
              // hasNext
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="screen">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({navigation, scene}) => (
            <Header 
              title="Settings" 
              scene={scene} 
              navigation={navigation} 
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function ComponentsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          header: ({navigation, scene}) => (
            <Header 
              title="Components" 
              scene={scene} 
              navigation={navigation} 
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{flex: 1}}
      drawerContent={props => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: 'center',
          alignContent: 'center',
          // alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Balance">
      <Drawer.Screen
        name="Balance"
        component={BalanceStack}
      />

      <Drawer.Screen
        name="Create Account"
        component={CreateAccountStack}
      />

      <Drawer.Screen
        name="Fund Account"
        component={FundAccountStack}
      />

      <Drawer.Screen
        name="Transfer"
        component={TransferStack}
      />

      <Drawer.Screen
        name="Withdraw"
        component={WithdrawStack}
      />

    </Drawer.Navigator>
  );
}

export default function NavigationControllerContainer(props) {

  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn)

  return (
    <Stack.Navigator mode="card" headerMode="none">
      {!isLoggedIn ? (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) :
        <Stack.Screen name="App" component={AppStack} />
    }
    </Stack.Navigator>
  );
}
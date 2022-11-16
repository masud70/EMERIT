import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, ForgotPassword, Register} from '../screens';
import {COLORS, ROUTES} from '../constants';
import DrawerNavigator from './DrawerNavigator';
import OtpCode from '../screens/auth/OtpCode';

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} options={{headerShown: false}}/>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{headerShown: false}}/>
      <Stack.Screen name={ROUTES.REGISTER} component={Register} options={{headerShown: false}}/>
      <Stack.Screen name={ROUTES.OTP_ROUTE} component={OtpCode} options={{headerShown: false}}/>
      <Stack.Screen name={ROUTES.HOME} component={DrawerNavigator} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default AuthNavigator;

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, ForgotPassword, Register } from '../screens';
import { CONSTANT, ROUTES } from '../constants';
import DrawerNavigator from './DrawerNavigator';
import OtpCode from '../screens/auth/OtpCode';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

var req = axios.create({
    baseURL: CONSTANT.BASE_URL,
    timeout: 1000
});
const Stack = createStackNavigator();

// Navigator, Screen, Group
function AuthNavigator() {
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@USER_TOKEN');
            if (value !== null) {
                return value;
            }
        } catch (e) {
            console.log(e);
        }
    };

    

    return (
        <Stack.Navigator
            initialRouteName={isLoggedIn ? ROUTES.LOGIN : ROUTES.HOME}>
            {!isLoggedIn ? (
                <Stack.Group>
                    <Stack.Screen
                        name={ROUTES.LOGIN}
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={ROUTES.FORGOT_PASSWORD}
                        component={ForgotPassword}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={ROUTES.REGISTER}
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={ROUTES.OTP_ROUTE}
                        component={OtpCode}
                        options={{ headerShown: false }}
                    />
                </Stack.Group>
            ) : (
                <Stack.Group>
                    <Stack.Screen
                        name={ROUTES.HOME}
                        component={DrawerNavigator}
                        options={{ headerShown: false }}
                    />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
}

export default AuthNavigator;

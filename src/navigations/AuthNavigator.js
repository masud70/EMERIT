import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, ForgotPassword, Register } from '../screens';
import { ROUTES } from '../constants';
import DrawerNavigator from './DrawerNavigator';
import OtpCode from '../screens/auth/OtpCode';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../redux/state/auth/authSlice';

const Stack = createStackNavigator();

// Navigator, Screen, Group
function AuthNavigator() {
    const loginStatus = useSelector(state => state.auth.loginStatus);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        AsyncStorage.getItem('@ACCESS_TOKEN')
            .then(res => {
                if (res !== null) {
                    dispatch(login({ token: res }));
                }
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <Stack.Navigator
            initialRouteName={!loginStatus ? ROUTES.LOGIN : ROUTES.HOME}>
            {!loginStatus ? (
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

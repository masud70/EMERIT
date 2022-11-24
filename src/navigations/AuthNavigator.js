import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, ForgotPassword, Register } from '../screens';
import { CONSTANT, ROUTES } from '../constants';
import DrawerNavigator from './DrawerNavigator';
import OtpCode from '../screens/auth/OtpCode';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { login } from '../redux/state/auth/loginSlice';

var req = axios.create({
    baseURL: CONSTANT.BASE_URL,
    timeout: 1000
});
const Stack = createStackNavigator();

// Navigator, Screen, Group
function AuthNavigator() {
    let isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            getData()
                .then(r => {
                    if(r){
                        isLoggedIn = true;
                        dispatch(login(r));
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        } catch (er) {
            console.log(er);
        }
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@ACCESS_TOKEN');
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

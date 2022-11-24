import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import Profile from './Profile';
import { ROUTES } from '../../constants';

const Stack = createStackNavigator();

function ProfileNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={ROUTES.EDIT_PROFILE}>
            <Stack.Screen name={ROUTES.MY_PROFILE} component={MyProfile} />
            <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} />
            <Stack.Screen name={ROUTES.USER_PROFILE} component={Profile} />
        </Stack.Navigator>
    );
}

export default ProfileNavigator;

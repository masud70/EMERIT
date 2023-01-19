import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import { Contest } from '../screens';
import ContestScreen from '../screens/home/ContestScreen';

const Stack = createStackNavigator();

function ContestNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.CONTEST}>
            <Stack.Screen name={ROUTES.CONTEST} component={Contest} />
            <Stack.Screen name={ROUTES.CONTEST_SCREEN} component={ContestScreen} />
        </Stack.Navigator>
    );
}

export default ContestNavigator;

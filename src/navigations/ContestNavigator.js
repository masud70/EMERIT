import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import { Contest } from '../screens';
import ContestScreen from '../screens/home/ContestScreen';
import ContestDetails from '../screens/contest/ContestDetails';
import LeaderBoard from '../screens/contest/LeaderBoard';

const Stack = createStackNavigator();

function ContestNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.CONTEST}>
            <Stack.Screen name={ROUTES.CONTEST} component={Contest} />
            <Stack.Screen name={ROUTES.CONTEST_DETAILS} component={ContestDetails} />
            <Stack.Screen name={ROUTES.CONTEST_SCREEN} component={ContestScreen} />
            <Stack.Screen name={ROUTES.CONTEST_LEADERBOARD} component={LeaderBoard} />
        </Stack.Navigator>
    );
}

export default ContestNavigator;

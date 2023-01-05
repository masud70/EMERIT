import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import AuthorDashboard from '../screens/drawerScreens/AuthorDashboard';
import ContestSectionHome from '../screens/authorScreens/contestSection/ContestSectionHome';
import CreateContest from '../screens/authorScreens/contestSection/CreateContest';
import EditContest from '../screens/authorScreens/contestSection/EditContest';

const Stack = createStackNavigator();

function AuthorNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={ROUTES.AUTHOR_HOME}>
            <Stack.Screen
                name={ROUTES.AUTHOR_HOME}
                component={AuthorDashboard}
            />
            <Stack.Screen
                name={ROUTES.AUTHOR_CONTEST}
                component={ContestSectionHome}
            />
            <Stack.Screen
                name={ROUTES.AUTHOR_CONTEST_CREATE}
                component={CreateContest}
            />
            <Stack.Screen
                name={ROUTES.AUTHOR_CONTEST_EDIT}
                component={EditContest}
            />
        </Stack.Navigator>
    );
}

export default AuthorNavigator;

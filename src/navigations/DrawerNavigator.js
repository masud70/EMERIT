import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, ROUTES } from '../constants';
import { Notifications } from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import MyHistory from '../screens/drawerScreens/MyHistory';
import ProfileNavigator from '../screens/profile';
import AuthorNavigator from './AuthorNavigator';
import { useEffect } from 'react';
import { FUNCTIONS } from '../helpers';
import { useDispatch } from 'react-redux';
import { setContestData } from '../redux/state/contestSlice';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    const dispatch = useDispatch();

    useEffect(() => {
        FUNCTIONS.getAllContest(5)
            .then(res => {
                if (res.status) {
                    dispatch(setContestData({ data: res.data }));
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    });
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            initialRouteName={ROUTES.HOME}
            swipeEnabled={true}
            swipeEdgeWidth={700}
            gestureEnabled={true}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: COLORS.primary,
                drawerActiveTintColor: COLORS.white,
                drawerLabelStyle: {
                    marginLeft: -20
                }
            }}>
            <Drawer.Screen
                name={ROUTES.HOME_DRAWER}
                component={BottomTabNavigator}
                options={{
                    title: 'Home',
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="home-sharp" size={18} color={color} />
                    )
                }}
            />

            <Drawer.Screen
                name={ROUTES.MY_PROFILE_TAB}
                component={ProfileNavigator}
                options={{
                    title: 'My Profile',
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="person-sharp" size={18} color={color} />
                    )
                }}
            />

            <Drawer.Screen
                name={ROUTES.HISTORY}
                component={MyHistory}
                options={{
                    title: 'My History',
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="timer-sharp" size={18} color={color} />
                    )
                }}
            />

            <Drawer.Screen
                name={ROUTES.NOTIFICATIONS_DRAWER}
                component={Notifications}
                options={{
                    title: 'Notifications',
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="notifications" size={18} color={color} />
                    )
                }}
            />

            <Drawer.Screen
                name={ROUTES.AUTHOR}
                component={AuthorNavigator}
                options={{
                    title: 'Author Dashboard',
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="reader" size={18} color={color} />
                    )
                }}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;

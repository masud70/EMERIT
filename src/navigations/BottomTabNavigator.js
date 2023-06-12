import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, TouchableOpacity } from 'react-native';
import { COLORS, ROUTES } from '../constants';
import { Home, Archive } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsNavigator from './SettingsNavigator';
import { useNavigation } from '@react-navigation/native';
import ContestNavigator from './ContestNavigator';
import Timeline from '../screens/timeline/Timeline';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarInactiveTintColor: COLORS.dark,
                tabBarActiveTintColor: COLORS.primary,
                headerTintColor: COLORS.primary,
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;
                    if (route.name === ROUTES.HOME_TAB) {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                    } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === ROUTES.CONTEST_NAVIGATOR) {
                        iconName = focused ? 'trophy-sharp' : 'trophy-outline';
                    } else if (route.name === ROUTES.NOTIFICATIONS) {
                        iconName = focused ? 'md-notifications-sharp' : 'md-notifications-outline';
                    } else if (route.name === ROUTES.ARCHIVE) {
                        iconName = focused ? 'file-tray-full-sharp' : 'file-tray-full-outline';
                    } else if (route.name === ROUTES.TIMELINE_TAB) {
                        iconName = focused ? 'menu' : 'menu-outline';
                    }
                    return <Icon name={iconName} size={focused ? 28 : 22} color={color} />;
                }
            })}
            initialRouteName={ROUTES.HOME}>
            <Tab.Screen name={ROUTES.HOME_TAB} options={{ title: 'Home' }} component={Home} />
            <Tab.Screen
                name={ROUTES.TIMELINE_TAB}
                options={{ title: 'Timeline' }}
                component={Timeline}
            />
            <Tab.Screen
                name={ROUTES.CONTEST_NAVIGATOR}
                options={{ title: 'Contest' }}
                component={ContestNavigator}
            />
            <Tab.Screen name={ROUTES.ARCHIVE} options={{ title: 'Archive' }} component={Archive} />
            {/* <Tab.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} /> */}
            <Tab.Screen
                name={ROUTES.SETTINGS_NAVIGATOR}
                component={SettingsNavigator}
                options={{
                    tabBarLabel: 'Settings',
                    title: 'Settings',
                    headerShown: false,
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <Icon
                                    name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                                    size={30}
                                    color={COLORS.primary}
                                    style={{ marginRight: 10 }}
                                />
                            </TouchableOpacity>
                        );
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

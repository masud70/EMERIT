import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../constants';
import {Home, Notifications, Contest, Archive} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsNavigator from './SettingsNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';
import QuestionBoxScreen from '../screens/home/QuestionBoxScreen';
import ContestScreen from '../screens/home/ContestScreen';

const Tab = createBottomTabNavigator();


function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarActiveTintColor: COLORS.primary,
        headerTintColor: COLORS.primary,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === ROUTES.CONTEST) {
            iconName = focused ? 'trophy-sharp' : 'trophy-outline';
          } else if (route.name === ROUTES.NOTIFICATIONS) {
            iconName = focused ? 'md-notifications-sharp' : 'md-notifications-outline';
          }else if (route.name === ROUTES.ARCHIVE) {
            iconName = focused ? 'file-tray-full-sharp' : 'file-tray-full-outline';
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
      initialRouteName={ROUTES.HOME}
      >
      <Tab.Screen name={ROUTES.HOME_TAB} component={Home} options={{title: 'Home'}}/>
      <Tab.Screen name={ROUTES.CONTEST} component={Contest}/>
      <Tab.Screen name={ROUTES.ARCHIVE} component={ContestScreen}/>
      <Tab.Screen name={ROUTES.NOTIFICATIONS} component={Notifications}/>
      <Tab.Screen name={ROUTES.SETTINGS_NAVIGATOR} component={SettingsNavigator}
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
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
});

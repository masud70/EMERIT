import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store/store';
import AuthNavigator from './src/navigations/AuthNavigator';
import { Provider } from 'react-redux';

export default function App() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <AuthNavigator />
            </Provider>
        </NavigationContainer>
    );
}

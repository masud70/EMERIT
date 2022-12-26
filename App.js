import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store/store';
import AuthNavigator from './src/navigations/AuthNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { AuthContext } from './src/contexts/authContext';

export default function App() {
    var initialValue = {
        loginStatus: "false1",
    };
    return (
        <NavigationContainer>
            <AuthContext.Provider value={initialValue}>
                <Provider store={store}>
                    <PaperProvider>
                        <AuthNavigator />
                        <Toast />
                    </PaperProvider>
                </Provider>
            </AuthContext.Provider>
        </NavigationContainer>
    );
}

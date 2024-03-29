import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store/store';
import AuthNavigator from './src/navigations/AuthNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { Provider as AppProvider } from '@react-native-material/core';
import { AuthContext } from './src/contexts/authContext';
import { PortalProvider } from '@react-native-material/core';
import { InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client';
import { BASE_URL } from '@env';

export default function App() {
    var initialValue = {
        loginStatus: 'false1'
    };
    const client = new ApolloClient({
        uri: BASE_URL + '/graphql',
        cache: new InMemoryCache()
    });

    return (
        <NavigationContainer>
            <ApolloProvider client={client}>
                <AuthContext.Provider value={initialValue}>
                    <Provider store={store}>
                        <PaperProvider>
                            <PortalProvider>
                                <AppProvider>
                                    <AuthNavigator />
                                    <Toast />
                                </AppProvider>
                            </PortalProvider>
                        </PaperProvider>
                    </Provider>
                </AuthContext.Provider>
            </ApolloProvider>
        </NavigationContainer>
    );
}

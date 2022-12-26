import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONSTANT } from '../constants';

export default {
    login: async (auth, data) => {
        const url = CONSTANT.SERVER_URL + 'user/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: 'Login failed!' };
        }
    },
    
    register: async data => {
        const url = CONSTANT.SERVER_URL + 'user/register';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: 'Registration failed!' };
        }
    },

    isLoggedIn: async token => {
        try {
            await AsyncStorage.getItem(token).then(e => {
                return e;
            });
        } catch (e) {
            return false;
        }
    },
    storeData: async (token, value) => {
        try {
            await AsyncStorage.setItem(token, value);
        } catch (e) {
            console.log(e);
        }
    }
};

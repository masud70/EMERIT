import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
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

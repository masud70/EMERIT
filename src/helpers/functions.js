import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
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

    getUserData: async token => {
        const url = CONSTANT.SERVER_URL + 'user/getUserData';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token
                }
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return {
                status: false,
                message: 'Trere was an error. Please try again.'
            };
        }
    },

    showToast: (type, head, body) => {
        Toast.show({
            type: type,
            text1: head,
            text2: body
        });
    },

    uploadImage: async data => {
        let fd = new FormData();
        fd.append('avatar', data);
        const imgUploadUrl = CONSTANT.SERVER_URL + 'uploadImage';
        try {
            const response = await fetch(imgUploadUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: fd
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    updateUser: async (data, token) => {
        const url = CONSTANT.SERVER_URL + 'user/update';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: error.message };
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

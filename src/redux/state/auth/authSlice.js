import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FUNCTIONS } from '../../../helpers';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginStatus: false,
        token: null,
        userData: {}
    },
    reducers: {
        login: (state, action) => {
            state.loginStatus = true;
            state.token = action.payload.token;
            if (action.payload.userData) {
                state.userData = action.payload.userData;
            }
            if (action.payload.token) {
                AsyncStorage.setItem('@ACCESS_TOKEN', action.payload.token)
                    .then(r => {})
                    .catch(e => {});
            }
        },

        logout: state => {
            AsyncStorage.removeItem('@ACCESS_TOKEN')
                .then(r => {})
                .catch(e => {});
            state.loginStatus = false;
            FUNCTIONS.showToast('success', 'Success!', 'Logout success');
        },

        setAuthUserData: (state, action) => {
            state.userData = action.payload.userData;
        }
    }
});

export const { login, logout, setAuthUserData } = authSlice.actions;
export default authSlice.reducer;

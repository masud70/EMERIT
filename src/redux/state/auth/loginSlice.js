import { createSlice } from '@reduxjs/toolkit';
import {FUNCTIONS} from '../../../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        token: null
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
            state.token = 'akqjehfuwehwue';
        },
        logout: state => {
            state.isLoggedIn = false;
            state.token = null;
        }
    }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout: state => {
            AsyncStorage.removeItem('@ACCESS_TOKEN')
                .then(r => console.log(r))
                .catch(e => {
                    console.log(e);
                });
            state.isLoggedIn = false;
            state.token = null;
        }
    }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

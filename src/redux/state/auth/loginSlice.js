import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        token: null,
        userData: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },
        logout: state => {
            AsyncStorage.removeItem('@ACCESS_TOKEN')
                .then(r => console.log(r))
                .catch(e => {
                    console.log(e);
                });
            state.isLoggedIn = false;
            state.token = null;
        },
        setUserData: (state, action)=>{
            state.userData = action.payload.userData;
        }
    }
});

export const { login, logout, setUserData } = loginSlice.actions;
export default loginSlice.reducer;

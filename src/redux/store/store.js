import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../state/auth/loginSlice';

export default configureStore({
    reducer: {
        login: loginSlice
    }
});

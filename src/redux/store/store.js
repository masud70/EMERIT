import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../state/auth/authSlice';

export default configureStore({
    reducer: {
        auth: authSlice
    },
});

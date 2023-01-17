import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../state/auth/authSlice';
import contestSlice from '../state/contestSlice';
import postSlice from '../state/postSlice';

export default configureStore({
    reducer: {
        auth: authSlice,
        contest: contestSlice,
        post: postSlice
    },
});

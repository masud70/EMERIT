import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        data: []
    },
    reducers: {
        setPostData: (state, action) => {
            if (action.payload.data) {
                state.data = action.payload.data;
            }
        }
    }
});

export const { setPostData } = postSlice.actions;
export default postSlice.reducer;

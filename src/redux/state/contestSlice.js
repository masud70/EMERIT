import { createSlice } from '@reduxjs/toolkit';

export const contestSlice = createSlice({
    name: 'contest',
    initialState: {
        data: []
    },
    reducers: {
        setContestData: (state, action) => {
            if (action.payload.data) {
                state.data = action.payload.data;
            }
        }
    }
});

export const { setContestData } = contestSlice.actions;
export default contestSlice.reducer;

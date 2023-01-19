import { createSlice } from '@reduxjs/toolkit';

export const contestSlice = createSlice({
    name: 'contest',
    initialState: {
        contestData: [],
        userContest: []
    },
    reducers: {
        setContestData: (state, action) => {
            if (action.payload.data) {
                state.contestData = action.payload.data;
            }
        },
        setUserContestData: (state, action) => {
            if (action.payload.data) {
                state.userContest = action.payload.data;
            }
        }
    }
});

export const { setContestData, setUserContestData } = contestSlice.actions;
export default contestSlice.reducer;

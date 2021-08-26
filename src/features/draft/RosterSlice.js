import { createSlice } from '@reduxjs/toolkit';

export const RosterSlice = createSlice({
  name: 'roster',
  initialState: {
    value: [],
  },
  reducers: {
    setRoster: (state, action) => {
      state.value = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});
export const { setRoster } = RosterSlice.actions;
export const selectRoster = (state) => state.roster.value;
export default RosterSlice.reducer;

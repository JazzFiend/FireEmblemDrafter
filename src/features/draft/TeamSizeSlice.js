import { createSlice } from '@reduxjs/toolkit';

export const TeamSizeSlice = createSlice({
  name: 'teamSize',
  initialState: {
    value: 0,
  },
  reducers: {
    setTeamSize: (state, action) => {
      state.value = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});
export const { setTeamSize } = TeamSizeSlice.actions;
export const selectTeamSize = (state) => state.teamSize.value;
export default TeamSizeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const ExclusiveCharacterSlice = createSlice({
  name: 'exclusiveCharacters',
  initialState: {
    value: [],
  },
  reducers: {
    setExclusiveCharacters: (state, action) => {
      state.value = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});
export const { setExclusiveCharacters } = ExclusiveCharacterSlice.actions;
export const selectExclusiveCharacters = (state) => state.exclusiveCharacters.value;
export default ExclusiveCharacterSlice.reducer;

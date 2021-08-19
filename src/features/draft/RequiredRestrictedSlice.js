import { createSlice } from '@reduxjs/toolkit';

export const RequiredRestrictedSlice = createSlice({
  name: 'requiredRestricted',
  initialState: {
    value: {
      requiredUnits: [],
      restrictedUnits: [],
    },
  },
  reducers: {
    setRequired: (state, action) => {
      state.value.requiredUnits = action.payload; // eslint-disable-line no-param-reassign
    },
    setRestricted: (state, action) => {
      state.value.restrictedUnits = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});
export const { setRequired, setRestricted } = RequiredRestrictedSlice.actions;
export const selectRequiredRestricted = (state) => state.requiredRestricted.value;
export default RequiredRestrictedSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const DraftInProgressSlice = createSlice({
  name: 'draftInProgress',
  initialState: {
    value: false,
  },
  reducers: {
    startDraft: (state) => {
      state.value = true; // eslint-disable-line no-param-reassign
    },
    endDraft: (state) => {
      state.value = false; // eslint-disable-line no-param-reassign
    },
  },
});
export const { startDraft, endDraft } = DraftInProgressSlice.actions;
export const selectDraftInProgress = (state) => state.draftInProgress.value;
export default DraftInProgressSlice.reducer;

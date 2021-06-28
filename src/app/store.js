import { configureStore } from '@reduxjs/toolkit';
import draftInProgressReducer from '../features/draft/DraftInProgressSlice';

export default configureStore({
  reducer: {
    draftInProgress: draftInProgressReducer,
  },
});

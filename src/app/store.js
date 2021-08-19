import { configureStore } from '@reduxjs/toolkit';
import draftInProgressReducer from '../features/draft/DraftInProgressSlice';
import requiredRestrictedReducer from '../features/draft/RequiredRestrictedSlice';
import rosterReducer from '../features/draft/RosterSlice';
import teamSizeReducer from '../features/draft/TeamSizeSlice';

export default configureStore({
  reducer: {
    draftInProgress: draftInProgressReducer,
    requiredRestricted: requiredRestrictedReducer,
    roster: rosterReducer,
    teamSize: teamSizeReducer,
  },
});

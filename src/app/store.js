import { configureStore } from '@reduxjs/toolkit';
import draftInProgressReducer from '../features/draft/DraftInProgressSlice';
import exclusiveCharacterReducer from '../features/draft/ExclusiveCharacterSlice';
import requiredRestrictedReducer from '../features/draft/RequiredRestrictedSlice';
import rosterReducer from '../features/draft/RosterSlice';
import teamSizeReducer from '../features/draft/TeamSizeSlice';

export default configureStore({
  reducer: {
    draftInProgress: draftInProgressReducer,
    exclusiveCharacters: exclusiveCharacterReducer,
    requiredRestricted: requiredRestrictedReducer,
    roster: rosterReducer,
    teamSize: teamSizeReducer,
  },
});

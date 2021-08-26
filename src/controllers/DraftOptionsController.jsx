import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectDraftInProgress } from '../features/draft/DraftInProgressSlice';
import { selectTeamSize, setTeamSize } from '../features/draft/TeamSizeSlice';
import DraftOptions from '../view/DraftOptions';

export default function DraftOptionsController(props) {
  const {
    maxTeamSize,
    gameSelected,
  } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const draftInProgress = useSelector(selectDraftInProgress);
  const teamSize = useSelector(selectTeamSize);
  const dispatch = useDispatch();

  function checkTeamSize(updatedTeamSize) {
    if (updatedTeamSize <= 0 || updatedTeamSize > maxTeamSize) {
      setErrorMessage('Please enter a valid team size.');
    } else {
      setErrorMessage('');
    }
    dispatch(setTeamSize(updatedTeamSize));
  }

  function showDraftOptions() {
    return !draftInProgress && gameSelected;
  }

  return (
    <DraftOptions
      showDraftOptions={showDraftOptions(gameSelected, draftInProgress)}
      handleTeamSizeChange={(updatedTeamSize) => checkTeamSize(updatedTeamSize)}
      displayedValue={teamSize}
      errorMessage={errorMessage}
    />
  );
}

DraftOptionsController.propTypes = {
  gameSelected: PropTypes.bool.isRequired,
  maxTeamSize: PropTypes.number.isRequired,
};

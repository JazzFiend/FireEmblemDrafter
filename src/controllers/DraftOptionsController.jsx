import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectDraftInProgress } from '../features/draft/DraftInProgressSlice';
import DraftOptions from '../view/DraftOptions';

export default function DraftOptionsController(props) {
  const {
    handleTeamSizeChange,
    maxTeamSize,
    gameSelected,
    defaultValue,
  } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const draftInProgress = useSelector(selectDraftInProgress);

  function checkTeamSize(teamSize) {
    if (teamSize <= 0 || teamSize > maxTeamSize) {
      setErrorMessage('Please enter a valid team size.');
    } else {
      setErrorMessage('');
    }
    handleTeamSizeChange(teamSize);
  }

  function showDraftOptions() {
    return !draftInProgress && gameSelected;
  }

  return (
    <DraftOptions
      showDraftOptions={showDraftOptions(gameSelected, draftInProgress)}
      handleTeamSizeChange={(teamSize) => checkTeamSize(teamSize)}
      defaultValue={defaultValue}
      errorMessage={errorMessage}
    />
  );
}

DraftOptionsController.propTypes = {
  gameSelected: PropTypes.bool.isRequired,
  defaultValue: PropTypes.number,
  maxTeamSize: PropTypes.number.isRequired,
  handleTeamSizeChange: PropTypes.func,
};

DraftOptionsController.defaultProps = {
  defaultValue: 0,
  handleTeamSizeChange: () => {},
};

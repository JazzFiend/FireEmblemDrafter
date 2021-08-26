import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FireEmblemDrafter from '../view/FireEmblemDrafter';
import { selectRoster } from '../features/draft/RosterSlice';

function FireEmblemDrafterController(props) {
  const { gameInfo, randomizePicks } = props;

  return (
    <FireEmblemDrafter
      gameInfo={gameInfo}
      gameSelected={useSelector(selectRoster).length > 0}
      maxTeamSize={useSelector(selectRoster).length}
      randomizePicks={randomizePicks}
    />
  );
}
export default FireEmblemDrafterController;

FireEmblemDrafterController.propTypes = {
  randomizePicks: PropTypes.bool,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    playableCharacters: PropTypes.arrayOf(PropTypes.string),
    defaultTeamSize: PropTypes.number,
  })).isRequired,
};

FireEmblemDrafterController.defaultProps = {
  randomizePicks: false,
};

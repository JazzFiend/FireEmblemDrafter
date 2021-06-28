import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import FireEmblemDrafter from '../view/FireEmblemDrafter';

function FireEmblemDrafterController(props) {
  const { gameInfo, randomizePicks } = props;
  const [roster, setRoster] = useState([]);
  const [teamSize, setTeamSize] = useState(0);
  const [restrictedCharacters, setRestrictedCharacters] = useState(Array(0));
  const [requiredCharacters, setRequiredCharacters] = useState(Array(0));

  function handleGameSelector(game) {
    setRoster(gameInfo.find((element) => element.id === game.value).playableCharacters);
    setTeamSize(gameInfo.find((element) => element.id === game.value).defaultTeamSize);
  }

  function handleRequiredUnitSelector(characterList) {
    setRequiredCharacters(characterList);
  }

  function handleRestrictedUnitSelector(characterList) {
    setRestrictedCharacters(characterList);
  }

  function handleTeamSizeChange(size) {
    setTeamSize(size);
  }

  return (
    <FireEmblemDrafter
      gameSelected={roster.length > 0}
      randomizePicks={randomizePicks}
      teamSize={teamSize}
      maxTeamSize={roster.length}
      roster={roster}
      requiredCharacters={requiredCharacters}
      restrictedCharacters={restrictedCharacters}
      gameInfo={gameInfo}
      handleGameSelector={(game) => handleGameSelector(game)}
      handleRequiredUnitSelector={(characterList) => handleRequiredUnitSelector(characterList)}
      handleRestrictedUnitSelector={(characterList) => handleRestrictedUnitSelector(characterList)}
      handleTeamSizeChange={(newTeamSize) => handleTeamSizeChange(newTeamSize)}
    />
  );
}
export default hot(module)(FireEmblemDrafterController);

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

import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import FireEmblemDrafter from '../view/FireEmblemDrafter';

export class FireEmblemDrafterController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draftInProgress: false,
      roster: undefined,
      teamSize: props.teamSize,
      randomizePicks: props.isRandom,
      gameInfo: props.gameInfo,
      restrictedCharacters: Array(0),
      requiredCharacters: Array(0),
    };
  }

  handleGameSelector(game) {
    const { gameInfo } = this.state;
    this.setState({
      roster: gameInfo.find((element) => element.id === game.value).playableCharacters,
    });
  }

  handleRequiredUnitSelector(characterList) {
    this.setState({
      requiredCharacters: characterList,
    });
  }

  handleRestrictedUnitSelector(characterList) {
    this.setState({
      restrictedCharacters: characterList,
    });
  }

  updateDraftProgress(draftState) {
    this.setState({
      draftInProgress: draftState,
    });
  }

  render() {
    const {
      draftInProgress, gameInfo, roster, restrictedCharacters, requiredCharacters, teamSize, randomizePicks,
    } = this.state;

    return (
      <FireEmblemDrafter
        draftInProgress={draftInProgress}
        gameInfo={gameInfo}
        roster={roster}
        restrictedCharacters={restrictedCharacters}
        requiredCharacters={requiredCharacters}
        teamSize={teamSize}
        randomizePicks={randomizePicks}
        handleGameSelector={(game) => this.handleGameSelector(game)}
        handleDraftProgress={(draftState) => this.updateDraftProgress(draftState)}
        handleRequiredUnitSelector={(characterList) => this.handleRequiredUnitSelector(characterList)}
        handleRestrictedUnitSelector={(characterList) => this.handleRestrictedUnitSelector(characterList)}
      />
    );
  }
}
export default hot(module)(FireEmblemDrafterController);

FireEmblemDrafterController.propTypes = {
  teamSize: PropTypes.number.isRequired,
  isRandom: PropTypes.bool,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    playableCharacters: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

FireEmblemDrafterController.defaultProps = {
  isRandom: false,
};

import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import './FireEmblemDrafter.css';
import GameSelectorController from '../../controllers/GameSelectorController';
import DraftController from '../../controllers/DraftController';
import RosterModifiersController from '../../controllers/RosterModifiersController';

export class FireEmblemDrafter extends Component {
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

  showRosterController() {
    const {
      roster,
      restrictedCharacters,
      requiredCharacters,
      draftInProgress,
    } = this.state;

    return (
      <div>
        <RosterModifiersController
          restrictedCharacters={restrictedCharacters}
          requiredCharacters={requiredCharacters}
          allCharacters={roster}
          handleRestrictedUnitSelector={(character) => this.handleRestrictedUnitSelector(character)}
          handleRequiredUnitSelector={(character) => this.handleRequiredUnitSelector(character)}
          draftInProgress={draftInProgress}
        />
      </div>
    );
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
      <div>
        <GameSelectorController
          draftInProgress={draftInProgress}
          gameInfo={gameInfo}
          handleGameSelector={(gameId) => this.handleGameSelector(gameId)}
        />
        {this.showRosterController()}
        <DraftController
          draftInProgress={draftInProgress}
          handleDraftProgress={(draftState) => this.updateDraftProgress(draftState)}
          roster={roster}
          restrictedCharacters={restrictedCharacters}
          requiredCharacters={requiredCharacters}
          teamSize={teamSize}
          randomizePicks={randomizePicks}
        />
      </div>
    );
  }
}
export default hot(module)(FireEmblemDrafter);

FireEmblemDrafter.propTypes = {
  teamSize: PropTypes.number.isRequired,
  isRandom: PropTypes.bool,
  gameInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    playableCharacters: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

FireEmblemDrafter.defaultProps = {
  isRandom: false,
};

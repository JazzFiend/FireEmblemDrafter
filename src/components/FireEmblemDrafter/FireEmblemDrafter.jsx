import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import './FireEmblemDrafter.css';
import GameSelector from '../GameSelector';
import DraftController from '../DraftController';
import RosterOptionsController from '../RosterOptionsController';

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

  handleGameSelector(gameId) {
    const { gameInfo } = this.state;
    this.setState({
      roster: gameInfo.find((element) => element.id === gameId).playableCharacters,
    });
  }

  handleRestrictedUnitSelector(character) {
    const { restrictedCharacters } = this.state;
    restrictedCharacters.push(character);
    this.setState({
      restrictedCharacters,
    });
  }

  // TODO: See the TODO statement in RosterOptionsController.
  handleRequiredUnitSelector(character) {
    const { requiredCharacters } = this.state;
    requiredCharacters.push(character);
    this.setState({
      requiredCharacters,
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
        <RosterOptionsController
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
        <GameSelector
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

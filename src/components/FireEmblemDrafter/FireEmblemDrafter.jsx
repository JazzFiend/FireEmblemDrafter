import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import _ from 'lodash';
import PropTypes from 'prop-types';

import './FireEmblemDrafter.css';
import Draft from '../../logic/Draft';
import RandomNumberGenerator from '../../logic/RandomNumberGenerator';
import RandomElementSelector from '../../logic/RandomElementSelector';
import TestRandomNumberGenerator from '../../logic/__mocks__/TestRandomNumberGenerator';
import GameSelector from '../GameSelector';
import DraftController from '../DraftController';
import Pick from '../Pick';
import RosterOptions from '../../logic/helpers/RosterOptions';

export class FireEmblemDrafter extends Component {
  static createRandomizer(randomizePicks) {
    if (randomizePicks) {
      return new RandomElementSelector(RandomNumberGenerator);
    }
    TestRandomNumberGenerator.clearState();
    return new RandomElementSelector(TestRandomNumberGenerator);
  }

  static displayTeam(team) {
    let teamDisplayFriendly = '';
    _.forEach(team, (value) => {
      teamDisplayFriendly = `${teamDisplayFriendly + value}\n`;
    });
    return teamDisplayFriendly;
  }

  constructor(props) {
    super(props);
    this.state = {
      pick: Array(6),
      draftInProgress: false,
      team: Array(0),
      draft: undefined,
      roster: undefined,
      teamSize: props.teamSize,
      randomizePicks: props.isRandom,
      gameInfo: props.gameInfo,
    };
  }

  handleGameSelector(gameId) {
    const { gameInfo } = this.state;
    this.setState({
      roster: gameInfo.find((element) => element.id === gameId).playableCharacters,
    });
  }

  startDraft() {
    const { roster, teamSize, randomizePicks } = this.state;
    const rosterOptions = new RosterOptions(roster, [], []);
    const randomizer = FireEmblemDrafter.createRandomizer(randomizePicks);
    const draft = new Draft(rosterOptions, teamSize, randomizer);
    const pick = draft.generateNextPick();

    this.setState({
      draftInProgress: true,
      draft,
      team: Array(0),
      pick,
    });
  }

  showPick(pick, draftInProgress, draft) {
    return (
      <div>
        {
          draftInProgress
          && <Pick pick={pick} onClick={(index) => this.handlePickClick(index, pick, draft)} />
        }
      </div>
    );
  }

  handlePickClick(buttonIndex, pick, draft) {
    let newPick;

    draft.select(pick[buttonIndex]);
    if (!draft.isDraftFinished()) {
      newPick = draft.generateNextPick();
    }

    this.setState({
      draftInProgress: !(draft.isDraftFinished()),
      pick: newPick,
      team: draft.getCurrentTeam(),
    });
  }

  render() {
    const {
      draftInProgress, pick, draft, team, gameInfo,
    } = this.state;

    return (
      <div>
        <GameSelector
          draftInProgress={draftInProgress}
          gameInfo={gameInfo}
          handleGameSelector={(gameId) => this.handleGameSelector(gameId)}
        />
        <DraftController onClickDraftController={() => this.startDraft()} draftInProgress={draftInProgress} />
        {this.showPick(pick, draftInProgress, draft)}
        <div data-testid="team-list">
          {FireEmblemDrafter.displayTeam(team)}
        </div>
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

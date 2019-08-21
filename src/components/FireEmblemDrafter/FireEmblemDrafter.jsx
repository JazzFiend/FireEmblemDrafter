import React, { Component } from "react";
import { hot } from "react-hot-loader";
import _ from 'lodash';
import PropTypes from 'prop-types';

import './FireEmblemDrafter.css';
import Draft from '../../logic/Draft';
import RandomNumberGenerator from '../../logic/RandomNumberGenerator';
import RandomElementSelector from '../../logic/RandomElementSelector';
import TestRandomNumberGenerator from '../../logic/__mocks__/TestRandomNumberGenerator';
import GameSelector from "../GameSelector";
import DraftController from "../DraftController";
import Pick from '../Pick';

//TODO: Put these static values in a file or something
const gameInfo = [
  {
    id: 0,
    title: 'The Sacred Stones',
    playableCharacters: ['Eirika', 'Ephraim', 'Seth', 'Franz', 'Gilliam', 'Vanessa', 'Moulder', 'Ross',
      'Garcia', 'Neimi', 'Colm', 'Artur', 'Lute', 'Natasha', 'Joshua', 'Forde',
      'Kyle', 'Tana', 'Amelia', 'Innes', 'Gerik', 'Tethys', 'Marisa', 'Ewan',
      'Duessel', 'Cormag', 'L\'Arachel', 'Dozla', 'Saleh', 'Rennac', 'Knoll',
      'Myrrh', 'Syrene',],
  },
  {
    id: 1,
    title: 'The Blazing Blade',
    playableCharacters: ['Lyn', 'Sain', 'Kent', 'Florina', 'Wil', 'Dorcas', 'Serra', 'Erk', 'Rath',
      'Matthew', 'Lucius', 'Wallace', 'Eliwood', 'Marcus', 'Lowen', 'Rebecca',
      'Bartre', 'Hector', 'Oswin', 'Guy', 'Priscilla', 'Raven', 'Canas', 'Dart',
      'Fiora', 'Legault', 'Ninian', 'Isadora', 'Heath', 'Hawkeye', 'Geitz', 'Pent',
      'Louise', 'Karel', 'Harken', 'Nino', 'Jaffar', 'Vaida', 'Renault', 'Athos',
      'Farina', 'Karla',],
  },
];

export class FireEmblemDrafter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: Array(6).fill(undefined),
      draftInProgress: false,
      team: Array(0),
      draft: undefined,
      roster: undefined,
      teamSize: props.teamSize,
      randomizePicks: props.isRandom,
    }
  }

  handleGameSelector(gameId) {
    this.setState({
      roster: gameInfo.find(function (element) {
        return element.id === gameId;
      }).playableCharacters,
    })
  }

  startDraft() {
    const { roster, teamSize, randomizePicks } = this.state;
    let randomizer = this.createRandomizer(randomizePicks);
    let draft = new Draft(roster, teamSize, randomizer);
    let pick = draft.generateNextPick();

    this.setState({
      draftInProgress: true,
      draft: draft,
      team: Array(0),
      pick: pick,
    });
  }

  createRandomizer(randomizePicks) {
    if (randomizePicks) {
      return new RandomElementSelector(new RandomNumberGenerator());
    }
    else {
      return new RandomElementSelector(new TestRandomNumberGenerator());
    }
  }

  showPick(pick, draftInProgress, draft) {
    return (
      <div>
        {
          draftInProgress &&
          <Pick pick={pick} onClick={index => this.handlePickClick(index, pick, draft)} />
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

  displayTeam(team) {
    let teamDisplayFriendly = "";
    _.forEach(team, function (value) {
      teamDisplayFriendly = teamDisplayFriendly + value + '\n';
    });
    return teamDisplayFriendly;
  }

  render() {
    const { draftInProgress, pick, draft, team } = this.state;
    return (
      <div>
        <GameSelector draftInProgress={draftInProgress} gameInfo={gameInfo} handleGameSelector={(gameId) => this.handleGameSelector(gameId)} />
        <DraftController onClickDraftController={() => this.startDraft()} draftInProgress={draftInProgress} />
        {this.showPick(pick, draftInProgress, draft)}
        <div data-testid='team-list'>
          {this.displayTeam(team)}
        </div>
      </div>
    );
  }
}
export default hot(module)(FireEmblemDrafter);

FireEmblemDrafter.propTypes = {
  teamSize: PropTypes.number.isRequired,
  isRandom: PropTypes.bool,
};

FireEmblemDrafter.defaultProps = {
  isRandom: false,
};

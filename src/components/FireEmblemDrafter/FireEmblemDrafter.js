import React, { Component } from "react";
import { hot } from "react-hot-loader";
import _ from 'lodash';

import "./FireEmblemDrafter.css";
import Draft from '../../logic/Draft';
import RandomNumberGenerator from '../../logic/RandomNumberGenerator';
import RandomElementSelector from '../../logic/RandomElementSelector';
import { Pick } from "../Pick";

const ROSTER = [
  'Eirika','Ephraim','Seth','Franz','Gilliam','Vanessa','Moulder','Ross',
  'Garcia','Neimi','Colm','Artur','Lute','Natasha','Joshua','Forde',
  'Kyle','Tana','Amelia','Innes','Gerik','Tethys','Marisa','Ewan',
  'Duessel','Cormag','L\'Arachel','Dozla','Saleh','Rennac','Knoll',
  'Myrrh','Syrene',
];

class FireEmblemDrafter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: Array(6).fill(undefined),
      draftInProgress: false,
      team: Array(0),
      draft: undefined
    }
  }

  render() {
    return (
      <div>
        <button className="start-draft-button" onClick={() => this.startDraft()}>
          {this.state.draftInProgress ? 'Restart Draft!' : 'Start Draft!'}
        </button>
        {this.showPick()}
        <div>
          {this.displayTeam(this.state.team)}
        </div>
      </div>
    );
  }

  startDraft() {
    const TEAM_SIZE = 18;
    let randomizer = new RandomElementSelector(new RandomNumberGenerator());
    let draft = new Draft(ROSTER, TEAM_SIZE, randomizer);
    this.setState({
      draftInProgress: true,
      draft: draft,
      team: Array(0),
    });

    this.generatePick(draft);
  }

  generatePick(draft) {
    let pick = draft.generateNextPick();
    this.setState({
      pick: pick,
    });
  }

  showPick() {
    return (
      <div>
        {
          this.state.draftInProgress && 
          <Pick pick={this.state.pick} onClick={index => this.handlePickClick(index)}/>
        }
      </div>
    );
  }

  handlePickClick(buttonIndex) {
    let draft = this.state.draft;
    let pick = this.state.pick;

    this.selectPick(pick[buttonIndex]);
    if(draft.isDraftFinished()) {
      this.completeDraft();
    } else {
      this.generatePick(draft);
    }
  }

  selectPick(pickIndex) {
    this.state.draft.select(pickIndex);
    this.setState({
      pick: Array(6).fill(undefined),
      team: this.state.draft.getCurrentTeam(),
    });
  }

  completeDraft() {
    this.setState({
      draftInProgress: false,
      draft: undefined,
    });
  }

  displayTeam(team) {
    let teamDisplayFriendly = "";
    _.forEach(team, function(value) {
      teamDisplayFriendly = teamDisplayFriendly + value + '\n';
    });
    return teamDisplayFriendly;
  }
}

export default hot(module)(FireEmblemDrafter);

import React, { Component } from "react";
import { hot } from "react-hot-loader";
import _ from 'lodash';
import PropTypes from 'prop-types';

import './FireEmblemDrafter.css';
import Draft from '../../logic/Draft';
import RandomNumberGenerator from '../../logic/RandomNumberGenerator';
import RandomElementSelector from '../../logic/RandomElementSelector';
import TestRandomNumberGenerator from '../../logic/__mocks__/TestRandomNumberGenerator';
import { Pick } from "../Pick";

export class FireEmblemDrafter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: Array(6).fill(undefined),
      draftInProgress: false,
      team: Array(0),
      draft: undefined,
      roster: props.roster,
      teamSize: props.teamSize,
      randomizePicks: props.isRandom,
    }
  }

  render() {
    return (
      <div>
        <button className="start-draft-button" data-testid="start-draft-button" onClick={() => this.startDraft()}>
          {this.state.draftInProgress ? 'Restart Draft!' : 'Start Draft!'}
        </button>
        {this.showPick()}
        <div data-testid='team-list'>
          {this.displayTeam(this.state.team)}
        </div>
      </div>
    );
  }

  startDraft() {
    let draft;
    if(this.state.randomizePicks) {
      draft = new Draft(this.state.roster, this.state.teamSize, new RandomElementSelector(new RandomNumberGenerator()));
    } else {
      draft = new Draft(this.state.roster, this.state.teamSize, new RandomElementSelector(new TestRandomNumberGenerator()));
    }

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

FireEmblemDrafter.propTypes = {
  roster: PropTypes.arrayOf(PropTypes.string),
  teamSize: PropTypes.number,
  isRandom: PropTypes.bool,
};

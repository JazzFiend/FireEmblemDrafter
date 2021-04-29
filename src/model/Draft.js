import _ from 'lodash';

export default class Draft {
  constructor(rosterOptions, teamSize, randomizer) {
    Draft._validateInputs(rosterOptions, teamSize, randomizer);
    this.roster = rosterOptions.roster.slice();
    this.teamSize = teamSize;
    this.randomizer = randomizer;
    this.team = rosterOptions.required.slice();
    this.draftComplete = false;
  }

  static _validateInputs(rosterOptions, teamSize, randomizer) {
    if (teamSize > rosterOptions.roster.length) {
      throw new RangeError('Team size larger than roster count.');
    }
    if (teamSize === 0) {
      throw new RangeError('Invalid team size.');
    }
    if (!randomizer) {
      throw new TypeError('Must define a randomizer');
    }
  }

  generateNextPick() {
    const pickSize = this._determinePickSize();
    return this.randomizer.pullRandomElements(this.roster.slice(0), pickSize);
  }

  _determinePickSize() {
    const pickSize = Math.floor(Math.log2(this.teamSize - this.team.length)) + 2;
    if (pickSize > this.roster.length) {
      return this.roster.length;
    }
    return pickSize;
  }

  select(selection) {
    if (this.roster.includes(selection)) {
      this.team.push(selection);
      _.remove(this.roster, (element) => element === selection);
      this._checkDraftComplete();
    } else {
      throw new TypeError(`${selection} is not in the roster.`);
    }
  }

  _checkDraftComplete() {
    if (this.team.length === this.teamSize) {
      this.draftComplete = true;
    }
  }

  getCurrentTeam() {
    return this.team;
  }

  isDraftFinished() {
    return this.draftComplete;
  }
}

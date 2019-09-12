import _ from 'lodash';

export default class Draft {
  constructor(roster, teamSize, randomizer) {
    Draft.validateInputs(roster, teamSize, randomizer);
    this.roster = roster.slice();
    this.teamSize = teamSize;
    this.randomizer = randomizer;
    this.team = [];
    this.draftComplete = false;
  }

  static validateInputs(roster, teamSize, randomizer) {
    if (!roster.length) {
      throw new TypeError('Roster is empty.');
    }
    if (teamSize > roster.length) {
      throw new RangeError('Team size larger than roster.');
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

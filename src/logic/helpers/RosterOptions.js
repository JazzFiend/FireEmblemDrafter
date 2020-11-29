import _ from 'lodash';

export default class RosterOptions {
  constructor(roster, restricted, required) {
    RosterOptions._validateInputs(roster, restricted, required);
    this.roster = RosterOptions._setupRoster(roster, restricted,);
    this.required = RosterOptions._parseRequired(roster, required);
    this.rosterCount = this.roster.length - this.required.length;
  }

  static _validateInputs(roster, restricted, required) {
    if (!roster.length) {
      throw new TypeError('Roster is empty.');
    }
    this._verifiyValidRosterValues(roster, restricted);
    this._verifiyValidRosterValues(roster, required);
  }

  static _verifiyValidRosterValues(roster, listToCheck) {
    _.forEach(listToCheck, (element) => {
      if (!roster.includes(element)) {
        throw new TypeError(`Incorrect value seen in restriction list: ${element}`);
      }
    });
  }

  static _setupRoster(roster, restricted, required) {
    let officialRoster = roster.slice();
    if (restricted !== undefined) {
      officialRoster = officialRoster.filter(
        (entry) => !restricted.includes(entry),
      );
    }
    if (required !== undefined) {
      officialRoster = officialRoster.filter(
        (entry) => !required.includes(entry),
      );
    }
    return officialRoster;
  }

  static _parseRequired(roster, required) {
    if (required !== undefined) {
      return required.slice();
    }
    return [];
  }
}

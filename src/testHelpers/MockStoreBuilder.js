import configureStore from 'redux-mock-store';

export default class MockStoreBuilder {
  constructor() {
    this.draftInProgress = false;
    this.requiredUnits = [];
    this.restrictedUnits = [];
    this.roster = [];
    this.teamSize = 0;
  }

  withDraftStatus(draftStatus) {
    this.draftInProgress = draftStatus;
    return this;
  }

  withRequiredUnits(requiredUnits) {
    this.requiredUnits = requiredUnits;
    return this;
  }

  withRestrictedUnits(restrictedUnits) {
    this.restrictedUnits = restrictedUnits;
    return this;
  }

  withRoster(roster) {
    this.roster = roster;
    return this;
  }

  withTeamSize(teamSize) {
    this.teamSize = teamSize;
    return this;
  }

  build() {
    const mockStore = configureStore([]);
    return mockStore({
      draftInProgress: {
        value: this.draftInProgress,
      },
      requiredRestricted: {
        value: {
          requiredUnits: this.requiredUnits,
          restrictedUnits: this.restrictedUnits,
        },
      },
      roster: {
        value: this.roster,
      },
      teamSize: {
        value: this.teamSize,
      },
    });
  }
}

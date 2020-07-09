import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Dropdown from './Dropdown/Dropdown';

// TODO: Didn't do required units yet. Here's the plan.
// Required Units
// Roster Dropdown
// List of current Required

class RosterOptionsController extends PureComponent {
  static displayList(list) {
    if (!list.length) {
      return '';
    }
    let listDisplayFriendly = 'Restricted Units: ';

    _.forEach(list, (value) => {
      listDisplayFriendly = `${listDisplayFriendly + value}\n`;
    });
    return listDisplayFriendly;
  }

  static _keyList(list) {
    const keyedList = [];
    _.forEach(list, (element, index) => {
      keyedList.push(
        {
          id: index,
          title: element,
        },
      );
    });
    return keyedList;
  }

  showRestrictedDropdown(currentRosterKeyed) {
    const { draftInProgress, allCharacters, handleRestrictedUnitSelector } = this.props;
    return (
      <div data-testid="restricted-drop-down">
        {
      (!draftInProgress && allCharacters.length > 0)
      && (
      <Dropdown
        defaultText="Add Restricted..."
        dropdownItems={currentRosterKeyed}
        onClick={(characterId) => handleRestrictedUnitSelector(currentRosterKeyed.find(
          (element) => element.id === characterId,
        ).title)}
      />
      )
    }
      </div>
    );
  }

  render() {
    const { restrictedCharacters, allCharacters } = this.props;
    const filteredRoster = allCharacters.filter((character) => (!restrictedCharacters.includes(character)));
    const currentRosterKeyed = RosterOptionsController._keyList(filteredRoster);

    return (
      <div>
        {this.showRestrictedDropdown(currentRosterKeyed)}
        <div data-testid="restricted-list">
          {RosterOptionsController.displayList(restrictedCharacters)}
        </div>
      </div>
    );
  }
}

RosterOptionsController.propTypes = {
  restrictedCharacters: PropTypes.arrayOf(PropTypes.string).isRequired,
  allCharacters: PropTypes.arrayOf(PropTypes.string),
  handleRestrictedUnitSelector: PropTypes.func.isRequired,
  draftInProgress: PropTypes.bool.isRequired,
};

RosterOptionsController.defaultProps = {
  allCharacters: [],
};

export default RosterOptionsController;

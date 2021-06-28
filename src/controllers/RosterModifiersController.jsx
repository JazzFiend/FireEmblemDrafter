import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RosterModifiers from '../view/RosterModifiers';
import { selectDraftInProgress } from '../features/draft/DraftInProgressSlice';

export default function RosterModifiersController(props) {
  const {
    restrictedCharacters,
    requiredCharacters,
    handleRequiredUnitSelector,
    handleRestrictedUnitSelector,
    allCharacters,
  } = props;
  const draftInProgress = useSelector(selectDraftInProgress);

  function addDisables(disabledList, fullListKeyed) {
    const keyedWithDisabled = fullListKeyed.map((keyedElement) => {
      if (disabledList.includes(keyedElement.label)) {
        const disabledItem = {
          label: keyedElement.label,
          value: keyedElement.value,
          isDisabled: true,
        };
        return disabledItem;
      }
      return keyedElement;
    });
    return keyedWithDisabled;
  }

  function keyList(list) {
    return list.map((element, index) => ({
      value: index,
      label: element,
    }));
  }

  function populateDefaultValues(defaultStringList, keyedListWithDisables) {
    return defaultStringList.map(
      (itemString) => keyedListWithDisables.find(
        (requiredOption) => itemString === requiredOption.label,
      ),
    );
  }

  function showRosterOptions() {
    return (!draftInProgress && allCharacters.length > 0);
  }

  const fullListKeyed = keyList(allCharacters);
  const restrictedOptionsWithDisables = addDisables(requiredCharacters, fullListKeyed);
  const requiredOptionsWithDisables = addDisables(restrictedCharacters, fullListKeyed);
  const requiredDefaults = populateDefaultValues(requiredCharacters, requiredOptionsWithDisables);
  const restrictedDefaults = populateDefaultValues(restrictedCharacters, restrictedOptionsWithDisables);

  return (
    <div>
      <RosterModifiers
        testId="required"
        placeholderText="Required Units"
        defaultValue={requiredDefaults}
        selected={requiredCharacters}
        optionsWithDisables={requiredOptionsWithDisables}
        onChangeHandler={handleRequiredUnitSelector}
        showRosterOptions={showRosterOptions(allCharacters)}
        showRosterOptionsLists={draftInProgress}
      />

      <RosterModifiers
        testId="restricted"
        placeholderText="Restricted Units"
        defaultValue={restrictedDefaults}
        selected={restrictedCharacters}
        optionsWithDisables={restrictedOptionsWithDisables}
        onChangeHandler={handleRestrictedUnitSelector}
        showRosterOptions={showRosterOptions(allCharacters)}
        showRosterOptionsLists={draftInProgress}
      />
    </div>
  );
}

RosterModifiersController.propTypes = {
  restrictedCharacters: PropTypes.arrayOf(PropTypes.string).isRequired,
  requiredCharacters: PropTypes.arrayOf(PropTypes.string).isRequired,
  allCharacters: PropTypes.arrayOf(PropTypes.string),
  handleRestrictedUnitSelector: PropTypes.func.isRequired,
  handleRequiredUnitSelector: PropTypes.func.isRequired,
};

RosterModifiersController.defaultProps = {
  allCharacters: [],
};

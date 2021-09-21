import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RosterModifiers from '../view/RosterModifiers';
import { selectDraftInProgress } from '../features/draft/DraftInProgressSlice';
import { selectRequiredRestricted, setRequired, setRestricted } from '../features/draft/RequiredRestrictedSlice';
import { selectRoster } from '../features/draft/RosterSlice';

export default function RosterModifiersController() {
  const draftInProgress = useSelector(selectDraftInProgress);
  const requiredRestrictedCharacters = useSelector(selectRequiredRestricted);
  const allCharacters = useSelector(selectRoster);
  const dispatch = useDispatch();

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

  function showDraftOptions() {
    return (!draftInProgress && allCharacters.length > 0);
  }

  const handleUpdateRequiredUnits = (requiredUnits) => {
    dispatch(setRequired(requiredUnits));
  };

  const handleUpdateRestrictedUnits = (requiredUnits) => {
    dispatch(setRestricted(requiredUnits));
  };

  const fullListKeyed = keyList(allCharacters);
  const restrictedOptionsWithDisables = addDisables(requiredRestrictedCharacters.requiredUnits, fullListKeyed);
  const requiredOptionsWithDisables = addDisables(requiredRestrictedCharacters.restrictedUnits, fullListKeyed);
  const requiredDefaults = populateDefaultValues(
    requiredRestrictedCharacters.requiredUnits,
    requiredOptionsWithDisables,
  );
  const restrictedDefaults = populateDefaultValues(
    requiredRestrictedCharacters.restrictedUnits,
    restrictedOptionsWithDisables,
  );

  return (
    <div>
      <RosterModifiers
        testId="required"
        placeholderText="Required Units"
        defaultValue={requiredDefaults}
        selected={requiredRestrictedCharacters.requiredUnits}
        optionsWithDisables={requiredOptionsWithDisables}
        onChangeHandler={handleUpdateRequiredUnits}
        showDraftOptions={showDraftOptions(allCharacters)}
        showDraftOptionsLists={draftInProgress}
      />

      <RosterModifiers
        testId="restricted"
        placeholderText="Restricted Units"
        defaultValue={restrictedDefaults}
        selected={requiredRestrictedCharacters.restrictedUnits}
        optionsWithDisables={restrictedOptionsWithDisables}
        onChangeHandler={handleUpdateRestrictedUnits}
        showDraftOptions={showDraftOptions(allCharacters)}
        showDraftOptionsLists={draftInProgress}
      />
    </div>
  );
}

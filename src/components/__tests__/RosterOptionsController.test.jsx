import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RosterOptionsController from '../RosterOptionsController';

test('should not render when a set of characters is not loaded', () => {
  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={[]}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('');
});

test('should render when a set of characters is loaded', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('Add Restricted...');
});

test('should hide dropdown and show restricted units when draft has started', () => {
  const restrictedCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={restrictedCharacters}
      requiredCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={true}
    />,
  );

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('');
  const restrictedList = getByTestId('restricted-list');
  expect(restrictedList).toHaveTextContent('Restricted Units: y z');
});

test('should hide dropdown and show required units when draft has started', () => {
  const requiredCharacters = ['y', 'z'];
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];

  const { getByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={requiredCharacters}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={true}
    />,
  );

  const requiredDropdown = getByTestId('required-drop-down');
  expect(requiredDropdown).toHaveTextContent('');
  const requiredList = getByTestId('required-list');
  expect(requiredList).toHaveTextContent('Required Units: y z');
});

test('should run restrictedUnitSelector function when clicked', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const testClickHandler = jest.fn();
  const { getByTestId, getAllByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={(id) => testClickHandler(id)}
      handleRequiredUnitSelector={() => {}}
      draftInProgress={false}
    />,
  );

  const restrictedDropdownInner = getAllByTestId('dropdown')[1];

  fireEvent.click(restrictedDropdownInner);
  const dropdownItems = getAllByTestId('dropdown-item');
  fireEvent.click(dropdownItems[0]);

  const restrictedDropdown = getByTestId('restricted-drop-down');
  expect(restrictedDropdown).toHaveTextContent('Add Restricted...');
  expect(testClickHandler).toHaveBeenCalledWith('u');
});

test('should run requiredUnitSelector function when clicked', () => {
  const allCharacters = ['u', 'v', 'w', 'x', 'y', 'z'];
  const testClickHandler = jest.fn();
  const { getByTestId, getAllByTestId } = render(
    <RosterOptionsController
      restrictedCharacters={[]}
      requiredCharacters={[]}
      allCharacters={allCharacters}
      handleRestrictedUnitSelector={() => {}}
      handleRequiredUnitSelector={(id) => testClickHandler(id)}
      draftInProgress={false}
    />,
  );

  const requiredDropdownInner = getAllByTestId('dropdown')[0];

  fireEvent.click(requiredDropdownInner);
  const dropdownItems = getAllByTestId('dropdown-item');
  fireEvent.click(dropdownItems[0]);

  const requiredDropdown = getByTestId('required-drop-down');
  expect(requiredDropdown).toHaveTextContent('Add Required...');
  expect(testClickHandler).toHaveBeenCalledWith('u');
});

import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { FireEmblemDrafter } from '../FireEmblemDrafter/FireEmblemDrafter';
import gameInfo from '../../reference/gameInfo';

afterEach(cleanup);

function selectItemInDropdown(container, dropdownClass, optionNumber) {
  userEvent.click(container.querySelector(`${dropdownClass}__control`));
  userEvent.click(container.querySelectorAll(`${dropdownClass}__option`)[optionNumber]);
}

function selectFirstGame(container) {
  selectItemInDropdown(container, '.game-selector', 0);
}

function selectSecondRestricted(container) {
  selectItemInDropdown(container, '.restricted-selector', 1);
}

function selectFirstRequired(container) {
  selectItemInDropdown(container, '.required-selector', 0);
}

function startDraft(getByTestId) {
  userEvent.click(getByTestId('start-draft-button'));
}

function clickFirstPick(getAllByTestId) {
  userEvent.click(getAllByTestId('pick-button')[0]);
}

function checkTeam(getByTestId, team) {
  expect(getByTestId('team-list')).toHaveTextContent(team);
}

function expectDraftToBeFinished(getByTestId) {
  expect(getByTestId('start-draft-button')).toHaveTextContent('Start Draft!');
}

test('should be able to run a complete draft', () => {
  const { container, getByTestId, getAllByTestId } = render(
    <FireEmblemDrafter
      teamSize={3}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  selectFirstGame(container, getByTestId);
  selectFirstRequired(container);
  selectSecondRestricted(container);
  startDraft(getByTestId);
  clickFirstPick(getAllByTestId);
  clickFirstPick(getAllByTestId);
  checkTeam(getByTestId, 'Eirika Franz Ross');
  expectDraftToBeFinished(getByTestId);
});

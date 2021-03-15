import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { FireEmblemDrafter } from '../FireEmblemDrafter';
import gameInfo from '../../../reference/gameInfo';

afterEach(cleanup);

function selectFirstGame(container) {
  userEvent.click(container.querySelector('.game-selector__control'));
  userEvent.click(container.querySelectorAll('.game-selector__option')[0]);
}

// TODO: This file is starting to mix unit tests and integration tests. Should probably seperate into two test types.
// TODO: These tests also need to utilize more setup functions.
test('draft should start when button is clicked', () => {
  const { container, getByTestId } = render(
    <FireEmblemDrafter
      teamSize={1}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );

  selectFirstGame(container, getByTestId);
  userEvent.click(getByTestId('start-draft-button'));

  expect(getByTestId('start-draft-button')).toHaveTextContent('Restart Draft!');
  expect(getByTestId('pick')).toBeVisible();
});

test('should add to team when pick is selected', () => {
  const { container, getByTestId, getAllByTestId } = render(
    <FireEmblemDrafter
      teamSize={1}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  selectFirstGame(container, getByTestId);
  userEvent.click(getByTestId('start-draft-button'));

  fireEvent.click(getByTestId('start-draft-button'));
  fireEvent.click(getAllByTestId('pick-button')[0]);
  // FIXME: This is a terrible matcher. Need to insert test values for game selector.
  expect(getByTestId('team-list')).toHaveTextContent('Ephrai');
});

test('should complete draft when draft is over', () => {
  const { container, getByTestId, getAllByTestId } = render(
    <FireEmblemDrafter
      teamSize={2}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  selectFirstGame(container, getByTestId);
  userEvent.click(getByTestId('start-draft-button'));

  fireEvent.click(getByTestId('start-draft-button'));
  fireEvent.click(getAllByTestId('pick-button')[0]);
  fireEvent.click(getAllByTestId('pick-button')[0]);
  // FIXME: This is a terrible matcher. Need to insert test values for game selector.
  expect(getByTestId('team-list')).toHaveTextContent('Vanes');
  expect(getByTestId('start-draft-button')).toHaveTextContent('Start Draft!');
});

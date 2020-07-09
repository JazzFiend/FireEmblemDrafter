import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FireEmblemDrafter } from '../FireEmblemDrafter';
import gameInfo from '../../../reference/gameInfo';

afterEach(cleanup);

// FIXME: Snapshots are getting to be more trouble then they are worth. Figure out best practices.
test('renders and matches snapshot', () => {
  const { asFragment } = render(
    <FireEmblemDrafter
      teamSize={2}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

// TODO: This file is starting to mix unit tests and integration tests. Should probably seperate into two test types.
test('draft should start when button is clicked', () => {
  const { getByTestId, getAllByTestId } = render(
    <FireEmblemDrafter
      teamSize={1}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  fireEvent.click(getByTestId('dropdown'));
  const dropdownItems = getAllByTestId('dropdown-item');
  fireEvent.click(dropdownItems[0]);
  fireEvent.click(getByTestId('start-draft-button'));
  expect(getByTestId('start-draft-button')).toHaveTextContent('Restart Draft!');
  expect(getByTestId('pick')).toBeVisible();
});

test('should add to team when pick is selected', () => {
  const { getByTestId, getAllByTestId } = render(
    <FireEmblemDrafter
      teamSize={1}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  fireEvent.click(getByTestId('dropdown'));
  const dropdownItems = getAllByTestId('dropdown-item');
  fireEvent.click(dropdownItems[0]);
  fireEvent.click(getByTestId('start-draft-button'));
  fireEvent.click(getAllByTestId('pick-button')[0]);
  // FIXME: This is a terrible matcher. Need to insert test values for game selector.
  expect(getByTestId('team-list')).toHaveTextContent('Ephrai');
});

test('should complete draft when draft is over', () => {
  const { getByTestId, getAllByTestId } = render(
    <FireEmblemDrafter
      teamSize={2}
      isRandom={false}
      gameInfo={gameInfo}
    />,
  );
  fireEvent.click(getByTestId('dropdown'));
  const dropdownItems = getAllByTestId('dropdown-item');
  fireEvent.click(dropdownItems[0]);
  fireEvent.click(getByTestId('start-draft-button'));
  fireEvent.click(getAllByTestId('pick-button')[0]);
  fireEvent.click(getAllByTestId('pick-button')[0]);
  // FIXME: This is a terrible matcher. Need to insert test values for game selector.
  expect(getByTestId('team-list')).toHaveTextContent('Vanes');
  expect(getByTestId('start-draft-button')).toHaveTextContent('Start Draft!');
});

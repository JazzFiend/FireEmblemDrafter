import {
  render,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DraftOptionsController from '../DraftOptionsController';

afterEach(cleanup);
test('does not render draft options when game has not been selected', () => {
  const { asFragment } = render(
    <DraftOptionsController gameSelected={false} draftInProgress={false} defaultValue={10} maxTeamSize={99} />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('does not render draft options when draft is in progress', () => {
  const { asFragment } = render(
    <DraftOptionsController gameSelected={true} draftInProgress={true} defaultValue={20} maxTeamSize={99} />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('renders draft options when game is selected and draft is not in progress', () => {
  const { asFragment } = render(
    <DraftOptionsController gameSelected={true} draftInProgress={false} defaultValue={30} maxTeamSize={99} />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('saves state of team size on change', () => {
  const dummy = jest.fn();
  const { getByTestId } = render(
    <DraftOptionsController
      gameSelected={true}
      draftInProgress={false}
      handleTeamSizeChange={dummy}
      defaultValue={0}
      maxTeamSize={99}
    />,
  );
  userEvent.type(getByTestId('team-size-textbox'), '3');

  expect(dummy).toHaveBeenCalledWith(3);
});

test('displays error when team size is invalid', () => {
  const dummy = jest.fn();
  const { asFragment, getByTestId } = render(
    <DraftOptionsController
      gameSelected={true}
      draftInProgress={false}
      handleTeamSizeChange={dummy}
      defaultValue={0}
      maxTeamSize={99}
    />,
  );
  userEvent.type(getByTestId('team-size-textbox'), '0');

  expect(asFragment()).toMatchSnapshot();
});

test('displays error when team size is too big', () => {
  const dummy = jest.fn();
  const { asFragment, getByTestId } = render(
    <DraftOptionsController
      gameSelected={true}
      draftInProgress={false}
      handleTeamSizeChange={dummy}
      defaultValue={10}
      maxTeamSize={10}
    />,
  );
  userEvent.type(getByTestId('team-size-textbox'), '10');

  expect(asFragment()).toMatchSnapshot();
});

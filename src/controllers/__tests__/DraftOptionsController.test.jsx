import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import DraftOptionsController from '../DraftOptionsController';
import MockStoreBuilder from '../../testHelpers/MockStoreBuilder';

afterEach(cleanup);

test('does not render draft options when game has not been selected', () => {
  const store = new MockStoreBuilder().withTeamSize(10).build();
  const { asFragment } = render(
    <Provider store={store}>
      <DraftOptionsController
        gameSelected={false}
        maxTeamSize={99}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('does not render draft options when draft is in progress', () => {
  const store = new MockStoreBuilder().withDraftStatus(true).withTeamSize(20).build();
  const { asFragment } = render(
    <Provider store={store}>
      <DraftOptionsController gameSelected={true} maxTeamSize={99} />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('renders draft options when game is selected and draft is not in progress', () => {
  const store = new MockStoreBuilder().withTeamSize(30).build();
  const { asFragment } = render(
    <Provider store={store}>
      <DraftOptionsController gameSelected={true} maxTeamSize={99} />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('saves state of team size on change', () => {
  const store = new MockStoreBuilder().build();
  const storeActions = store.getActions();
  const { getByTestId } = render(
    <Provider store={store}>
      <DraftOptionsController
        gameSelected={true}
        maxTeamSize={99}
      />
    </Provider>,
  );

  userEvent.type(getByTestId('team-size-textbox'), '3');

  expect(storeActions.length).toEqual(1);
  expect(storeActions[0].type).toEqual('teamSize/setTeamSize');
  expect(storeActions[0].payload).toEqual(3);
});

// FIXME: These two tests are being weird. The type() function is adding to what is already there. And the error
// message isn't popping up when it should sometimes. Testing the app manual shows that it works, so there's something
// up with the action here.
test('displays error when team size is invalid', () => {
  const store = new MockStoreBuilder().withTeamSize(0).build();
  const { asFragment, getByTestId } = render(
    <Provider store={store}>
      <DraftOptionsController
        gameSelected={true}
        maxTeamSize={99}
      />
    </Provider>,
  );

  userEvent.type(getByTestId('team-size-textbox'), '0');

  expect(asFragment()).toMatchSnapshot();
});

test('displays error when team size is too big', () => {
  const store = new MockStoreBuilder().withTeamSize(10).build();
  const { asFragment, getByTestId } = render(
    <Provider store={store}>
      <DraftOptionsController
        gameSelected={true}
        maxTeamSize={9}
      />
    </Provider>,
  );

  userEvent.type(getByTestId('team-size-textbox'), '11');

  expect(asFragment()).toMatchSnapshot();
});

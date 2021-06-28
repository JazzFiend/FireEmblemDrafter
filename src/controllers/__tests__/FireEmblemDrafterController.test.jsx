import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FireEmblemDrafterController from '../FireEmblemDrafterController';
import gameInfo from '../../reference/gameInfo';

afterEach(cleanup);

const mockStore = configureStore([]);

test('renders display in initial state', () => {
  const store = mockStore({
    draftInProgress: {
      value: false,
    },
  });
  const { asFragment } = render(
    <Provider store={store}>
      <FireEmblemDrafterController
        isRandom={false}
        gameInfo={gameInfo}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

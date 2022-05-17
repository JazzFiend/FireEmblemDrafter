import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import FireEmblemDrafterController from './controllers/FireEmblemDrafterController';
import gameInfo from './reference/gameInfo';
import store from './app/store';

function Homepage() {
  return (
    <div>
      <h1>Fire Emblem Helper </h1>
      <Link to="/draft" data-testid="drafter-link">Drafter</Link>
    </div>
  );
}

function DraftPage() {
  return (
    <div>
      <Link to="/">Homepage</Link>
      <Provider store={store}>
        <FireEmblemDrafterController
          randomizePicks
          gameInfo={gameInfo}
        />
      </Provider>
    </div>
  );
}

export {
  Homepage, DraftPage,
};

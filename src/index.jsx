import React from 'react';
import ReactDOM from 'react-dom';
import { FireEmblemDrafterController } from './controllers/FireEmblemDrafterController';
import gameInfo from './reference/gameInfo';

const TEAM_SIZE = 18;

ReactDOM.render(
  <FireEmblemDrafterController
    teamSize={TEAM_SIZE}
    isRandom
    gameInfo={gameInfo}
  />, document.getElementById('root'),
);

import React from 'react';
import ReactDOM from 'react-dom';
import { FireEmblemDrafter } from './components/FireEmblemDrafter/FireEmblemDrafter';

const TEAM_SIZE = 18;

ReactDOM.render(<FireEmblemDrafter teamSize={TEAM_SIZE} isRandom />, document.getElementById('root'));

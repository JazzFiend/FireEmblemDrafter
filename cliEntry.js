import readlineSync from 'readline-sync';
import _ from 'lodash';

import Draft from './src/model/Draft';
import RandomNumberGenerator from './src/model/RandomNumberGenerator';
import RandomElementSelector from './src/model/RandomElementSelector';

const fs = require('fs');
const util = require('util');

function formatRoster(unfilteredRoster) {
  const roster = unfilteredRoster.toString().split('\n');
  _.remove(roster, ((element) => element === ''));
  return roster;
}

async function extractInputData(fileName) {
  const readFilePromisified = util.promisify(fs.readFile);
  const unformattedRoster = await readFilePromisified(fileName);
  return formatRoster(unformattedRoster);
}

/* eslint-disable no-console */
function runDraft(roster) {
  const teamSize = 17;
  const randomizer = new RandomElementSelector(new RandomNumberGenerator());
  const draft = new Draft(roster, teamSize, randomizer);

  while (!draft.isDraftFinished()) {
    const pick = draft.generateNextPick();
    console.log('Current Team: ', draft.getCurrentTeam());
    console.log('This round\'s pick: ', pick);
    const selection = readlineSync.question('Make a selection: ');
    draft.select(selection);
  }
  return draft.getCurrentTeam();
}

module.exports = async () => {
  const roster = await extractInputData(process.argv[2]);
  const team = runDraft(roster);
  console.log(team);
  console.log('Final Team:', team);
};
/* eslint-enable no-console */

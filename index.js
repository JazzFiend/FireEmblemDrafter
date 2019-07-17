import Draft from './src/Draft'
import RandomNumberGenerator from './src/RandomNumberGenerator';
import RandomElementSelector from './src/RandomElementSelector';
import readlineSync from 'readline-sync';
import _ from 'lodash';

const fs = require('fs');
const util = require('util');

module.exports = async () => {
  let roster = await extractInputData(process.argv[2]);
  let team = runDraft(roster);
  console.log(team);
  console.log('Final Team:', team);
}

function runDraft(roster) {
  let teamSize = 17;
  let randomizer = new RandomElementSelector(new RandomNumberGenerator());
  let draft = new Draft(roster, teamSize, randomizer);

  while (!draft.isDraftFinished()) {
    let pick = draft.generateNextPick();
    console.log('Current Team: ', draft.getCurrentTeam());
    console.log('This round\'s pick: ', pick);
    let selection = readlineSync.question('Make a selection: ');
    draft.select(selection);
  }
  return draft.getCurrentTeam();
}

async function extractInputData(fileName) {
  let readFilePromisified = util.promisify(fs.readFile);
  let unformattedRoster = await readFilePromisified(fileName);
  return formatRoster(unformattedRoster);
}

function formatRoster(unfilteredRoster) {
  let roster = unfilteredRoster.toString().split('\n');
  _.remove(roster, function (element) {
    return element === '';
  });
  return roster;
}

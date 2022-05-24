const readlineSync = require('readline-sync');

const RandomNumberGenerator = require('./src/model/RandomNumberGenerator').default;
const RandomElementSelector = require('./src/model/RandomElementSelector').default;
const gameInfo = require('./src/reference/gameInfo').default;
const Draft = require('./src/model/Draft').default;

/* eslint-disable no-console */
function runDraft(roster, exclusives, teamSize) {
  const randomizer = new RandomElementSelector(RandomNumberGenerator);
  const draft = new Draft(roster, teamSize, randomizer, exclusives);

  while (!draft.isDraftFinished()) {
    const pick = draft.generateNextPick();
    console.log('Current Team: ', draft.getCurrentTeam());
    console.log('This round\'s pick: ', pick);
    const selection = readlineSync.question('Make a selection: ');
    draft.select(selection);
  }
  return draft.getCurrentTeam();
}

function getSelectedGameInfo(game) {
  return gameInfo.find((element) => element.title === game);
}

function buildDraftOptions(selectedGameInfo) {
  return {
    roster: selectedGameInfo.playableCharacters,
    required: [],
  };
}

// Arguments:
// argv[2] - Name of Game to use
// argv[3] - Size of Team
// Adding support for Required and Restricted characters isn't supported via CLI right now.
// Spelling a character's name wrong (case sensitive!) results in a crash.
module.exports = async () => {
  const selectedGameInfo = getSelectedGameInfo(process.argv[2]);
  const draftOptions = buildDraftOptions(selectedGameInfo);
  const team = runDraft(draftOptions, selectedGameInfo.exclusiveCharacters, parseInt(process.argv[3], 10));
  console.log(team);
  console.log('Final Team:', team);
};

/* eslint-enable no-console */

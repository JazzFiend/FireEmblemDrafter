import Draft from '../Draft';
import RandomElementSelector from '../RandomElementSelector';
import RosterOptions from '../helpers/RosterOptions';
import TestRandomNumberGenerator from '../__mocks__/TestRandomNumberGenerator';

let randomizer;
let draft;

beforeEach(() => {
  randomizer = new RandomElementSelector(TestRandomNumberGenerator);
});

function selectAndVerify(selection) {
  const newTeamSize = draft.getCurrentTeam().length + 1;
  draft.select(selection);
  expect(draft.getCurrentTeam().length).toBe(newTeamSize);
  expect(draft.getCurrentTeam().includes(selection)).toBeTruthy();
}

function verifyPickSize(pick, loopIndex) {
  if (loopIndex === 0) {
    expect(pick.length).toBe(6);
  } else if (loopIndex >= 1 && loopIndex < 9) {
    expect(pick.length).toBe(5);
  } else if (loopIndex >= 9 && loopIndex < 13) {
    expect(pick.length).toBe(4);
  } else if (loopIndex >= 13 && loopIndex < 15) {
    expect(pick.length).toBe(3);
  } else if (loopIndex === 15) {
    expect(pick.length).toBe(2);
  }
}

test('Team larger than roster should error', () => {
  const rosterOptions = new RosterOptions(['3']);
  expect(() => {
    new Draft(rosterOptions, 2, randomizer);
  }).toThrow(RangeError);
});

test('Team Size of zero should error', () => {
  const rosterOptions = new RosterOptions(['3']);
  expect(() => {
    new Draft(rosterOptions, 0, randomizer);
  }).toThrow(RangeError);
});

test('Null randomizer should error', () => {
  const rosterOptions = new RosterOptions(['3', '2', '1']);
  expect(() => {
    new Draft(rosterOptions, 2);
  }).toThrow(TypeError);
});

test('Given a roster of 1, draft a team of 1', () => {
  const rosterOptions = new RosterOptions(['1']);
  draft = new Draft(rosterOptions, 1, randomizer);
  const pick = draft.generateNextPick();
  expect(pick.length).toBe(1);
  expect(pick.includes('1')).toBeTruthy();
  selectAndVerify('1');
  expect(draft.isDraftFinished()).toBeTruthy();
});

test('Selecting an invalid value should throw', () => {
  const rosterOptions = new RosterOptions(['1']);
  draft = new Draft(rosterOptions, 1, randomizer);
  draft.generateNextPick();
  expect(() => {
    draft.select('f');
  }).toThrow(TypeError);
});

test('Given a roster of 2, draft a team of 1', () => {
  const rosterOptions = new RosterOptions(['a', 'b']);
  draft = new Draft(rosterOptions, 1, randomizer);
  draft.generateNextPick();
  selectAndVerify('b');
  expect(draft.isDraftFinished()).toBeTruthy();
});

test('Given a roster of 4, draft a team of 2', () => {
  const rosterOptions = new RosterOptions(['a', 'b', 'c', 'd']);
  draft = new Draft(rosterOptions, 2, randomizer);
  draft.generateNextPick();
  selectAndVerify('d');
  expect(draft.isDraftFinished()).toBeFalsy();

  draft.generateNextPick();
  selectAndVerify('a');
  expect(draft.getCurrentTeam().includes('a')).toBeTruthy();
  expect(draft.isDraftFinished()).toBeTruthy();
});

test('Given a roster of 4 and 1 restricted value, draft a team of 2', () => {
  const rosterOptions = new RosterOptions(['a', 'b', 'c', 'd'], ['a']);
  draft = new Draft(rosterOptions, 2, randomizer);
  const pick = draft.generateNextPick();
  expect(pick.includes('a')).toBeFalsy();

  selectAndVerify('d');
  expect(draft.isDraftFinished()).toBeFalsy();

  draft.generateNextPick();
  selectAndVerify('b');
  expect(draft.getCurrentTeam().includes('b')).toBeTruthy();
  expect(draft.isDraftFinished()).toBeTruthy();
});

test('Given a roster of 4 and 1 required value, draft a team of 2', () => {
  const rosterOptions = new RosterOptions(['a', 'b', 'c', 'd'], [], ['a']);
  draft = new Draft(rosterOptions, 2, randomizer);
  expect(draft.getCurrentTeam().includes('a')).toBeTruthy();
  selectAndVerify('d');
  expect(draft.getCurrentTeam().includes('d')).toBeTruthy();
  expect(draft.isDraftFinished()).toBeTruthy();
});

test('Given a list of 34 items, draft a team of 16', () => {
  const teamSize = 16;
  const rosterOptions = new RosterOptions(
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
      '31', '32', '33', '34'],
  );
  draft = new Draft(rosterOptions, teamSize, randomizer);

  for (let i = 0; i < teamSize; i++) {
    const pick = draft.generateNextPick();
    verifyPickSize(pick, i);
    selectAndVerify(pick[0]);
  }
  expect(draft.isDraftFinished()).toBeTruthy();
  expect(draft.getCurrentTeam()).toStrictEqual(
    ['2', '9', '15', '21', '27', '3', '10', '17', '24', '31',
      '5', '12', '19', '26', '32', '4'],
  );
});

test('Able to run a draft multiple times', () => {
  const rosterOptions = new RosterOptions(['a', 'b', 'c', 'd']);
  draft = new Draft(rosterOptions, 2, randomizer);
  draft.generateNextPick();
  selectAndVerify('d');
  draft.generateNextPick();
  selectAndVerify('a');
  expect(draft.getCurrentTeam().includes('d')).toBeTruthy();
  expect(draft.isDraftFinished()).toBeTruthy();

  draft = new Draft(rosterOptions, 2, randomizer);
  draft.generateNextPick();
  selectAndVerify('d');
  draft.generateNextPick();
  selectAndVerify('a');
  expect(draft.getCurrentTeam().includes('d')).toBeTruthy();
  expect(draft.isDraftFinished()).toBeTruthy();
});

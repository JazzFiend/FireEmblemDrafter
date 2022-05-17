import 'regenerator-runtime/runtime';
import MainPage from './pages/mainPage';
import DraftPage from './pages/draftPage';

const { clickDraftLink } = MainPage;
const {
  selectBindingBlade,
  addRoyToRequired,
  addMarcusToRestricted,
  setTeamSize,
  startDraft,
  takeFirstPick,
  checkDraftFinished,
  expectTeamToContainCharacter,
  expectPickToNotContainCharacter,
} = DraftPage;
const puppeteer = require('puppeteer');

async function setup() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  return { page, browser };
}

describe('Draft Page', () => {
  it('Should run a draft correctly', async () => {
    const { page, browser } = await setup();
    await clickDraftLink(page);
    await selectBindingBlade(page);
    await addRoyToRequired(page);
    await addMarcusToRestricted(page);
    await setTeamSize(page, 15);
    await startDraft(page);
    await expectTeamToContainCharacter(page, 'Roy');
    for (let i = 0; i < 14; i++) {
      // eslint-disable-next-line no-await-in-loop
      await expectPickToNotContainCharacter(page, 'Marcus');
      // eslint-disable-next-line no-await-in-loop
      await takeFirstPick(page);
    }
    await checkDraftFinished(page);
    await browser.close();
  });
});

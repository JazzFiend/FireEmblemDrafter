import UITestUtils from '../utils/uiTestUtils';

const {
  clickWhenLoaded,
  typeWhenLoaded,
  selectAllText,
  getTextFromElement,
  getTextFromAllElements,
} = UITestUtils;

const gameSelectorDropdown = '.game-selector__control';
const blazingBladeDropdownItem = '#react-select-2-option-2';
const requiredCharactersDropdown = '.required-selector__control';
const royDropdownItem = '#react-select-3-option-0';
const restrictedCharactersDropdown = '.restricted-selector__control';
const marcusDropdownItem = '#react-select-4-option-1';
const teamSizeCheckbox = '[data-testid=team-size-textbox]';
const startDraftButton = '[data-testid=start-draft-button]';
const pickButton = '[data-testid=pick-button]';
const teamList = '[data-testid=team-list]';

export default class DraftPage {
  static async selectBindingBlade(page) {
    await clickWhenLoaded(page, gameSelectorDropdown);
    await clickWhenLoaded(page, blazingBladeDropdownItem);
  }

  static async addRoyToRequired(page) {
    await clickWhenLoaded(page, requiredCharactersDropdown);
    await clickWhenLoaded(page, royDropdownItem);
  }

  static async addMarcusToRestricted(page) {
    await clickWhenLoaded(page, restrictedCharactersDropdown);
    await clickWhenLoaded(page, marcusDropdownItem);
  }

  static async setTeamSize(page, teamSize) {
    await selectAllText(page, teamSizeCheckbox);
    await typeWhenLoaded(page, teamSizeCheckbox, teamSize.toString());
  }

  static async startDraft(page) {
    await clickWhenLoaded(page, startDraftButton);
  }

  static async takeFirstPick(page) {
    await page.waitForSelector(pickButton);
    await (await page.$$(pickButton))[0].click();
  }

  static async checkDraftFinished(page) {
    await page.waitForSelector(startDraftButton);
  }

  static async expectTeamToContainCharacter(page, character) {
    const currentTeam = await getTextFromElement(page, teamList);
    expect(currentTeam.includes(character)).toBeTruthy();
  }

  static async expectPickToNotContainCharacter(page) {
    const buttonTexts = await getTextFromAllElements(page, pickButton);
    expect(buttonTexts.includes('Marcus')).toBeFalsy();
  }
}

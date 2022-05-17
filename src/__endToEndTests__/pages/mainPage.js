import UITestUtils from '../utils/uiTestUtils';

const { clickWhenLoaded } = UITestUtils;

const drafterLink = '[data-testid=drafter-link]';

export default class MainPage {
  static async clickDraftLink(page) {
    await clickWhenLoaded(page, drafterLink);
  }
}

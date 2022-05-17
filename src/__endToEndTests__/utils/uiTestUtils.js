export default class UITestUtils {
  static async clickWhenLoaded(page, identifier) {
    await page.waitForSelector(identifier);
    await (await page.$(identifier)).click();
  }

  static async typeWhenLoaded(page, identifier, text) {
    await page.waitForSelector(identifier);
    await (await page.type(identifier, text));
  }

  static async selectAllText(page, identifier) {
    await page.waitForSelector(identifier);
    await (await page.$(identifier)).click({ clickCount: 3 });
  }

  static async getTextFromElement(page, selector) {
    await page.waitForSelector(selector);
    const elementText = await page.$eval(selector, (element) => element.textContent);
    return elementText;
  }

  static async getTextFromAllElements(page, selector) {
    const allElementText = await page.$$eval(selector, (options) => options.map((option) => option.textContent));
    return allElementText;
  }
}

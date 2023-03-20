import playwright from "playwright";

export const container = async (
  callback: (page: playwright.Page) => Promise<void> | void
) => {
  console.log(`------------------start------------------`);

  const browser = await playwright.chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await callback(page);
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
  console.log(`-------------------end-------------------`);
};

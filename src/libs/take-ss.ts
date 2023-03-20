import playwright from "playwright";

export const initTakeSS = (contextPath: string, page: playwright.Page) => {
  return async (title: string) => {
    await page.screenshot({ path: `./outputs/${contextPath}/ss/${title}` });
  };
};

import { fileURLToPath } from "url";
import { initPlaywrightFunc } from "../libs/init-playwright-func.js";
import playwright from "playwright";

export const example = async (page: playwright.Page) => {
  const __filename = fileURLToPath(import.meta.url);
  const { takeSS } = initPlaywrightFunc(__filename, page);

  await page.goto("https://www.google.com/");

  // this outputted to <project_root>/outputs/example/ss/google.png
  await takeSS("google.png");
};

import playwright from "playwright";
import { initTakeSS } from "./take-ss.js";
import { createContextPath } from "./create-context-path.js";

export const initPlaywrightFunc = (filename: string, page: playwright.Page) => {
  const contextPath = createContextPath(filename);

  return {
    takeSS: initTakeSS(contextPath, page),
  };
};

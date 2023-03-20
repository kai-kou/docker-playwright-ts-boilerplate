import playwright from "playwright";
import { initTakeSS } from "./take-ss.js";

export const initPlaywrightFunc = (filename: string, page: playwright.Page) => {
  // format to eee/index from ./src/eee/index.ts
  // app dir is root directory in Docker container
  const contextPath = filename
    .slice("/app/src/scripts".length)
    .slice(0, -".ts".length);

  return {
    takeSS: initTakeSS(contextPath, page),
  };
};

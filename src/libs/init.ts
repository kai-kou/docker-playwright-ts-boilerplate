import { createContextPath } from "./create-context-path.js";
import { initConcatSameHeaderCSV } from "./init-concat-same-header-csv.js";
import { initCreateCSV } from "./init-create-csv.js";

// init without playwright. like createCsv
export const init = (filename: string) => {
  const contextPath = createContextPath(filename);

  return {
    createCSV: initCreateCSV(contextPath),
    concatSameHeaderCSV: initConcatSameHeaderCSV(contextPath),
  };
};

import { concatSameHeaderCSV as originalConcatSameHeaderCSV } from "./concat-same-header-csv.js";

export const initConcatSameHeaderCSV = (contextPath: string) => {
  /**
   * Create CSV file
   * @param title Title of CSV file
   */
  const dirPath = `./outputs/${contextPath}/csv`;
  const concatSameHeaderCSV = async (title: string, ...data: string[]) => {
    originalConcatSameHeaderCSV(dirPath, title, ...data);
  };
  return concatSameHeaderCSV;
};

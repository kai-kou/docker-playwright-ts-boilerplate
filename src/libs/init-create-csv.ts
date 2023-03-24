import fs from "fs";
import { createCSV as originalCreateCSV } from "./create-csv.js";

export const initCreateCSV = (contextPath: string) => {
  const dirPath = `./outputs/${contextPath}/csv`;
  /**
   * Create CSV file
   * @param title Title of CSV file
   * @param data Data of CSV file like "a,b,c\n1,2,3"
   */
  const createCSV = async (title: string, data: string) => {
    originalCreateCSV(dirPath, title, data);
  };

  return createCSV;
};

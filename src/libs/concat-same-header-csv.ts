import fs from "fs";
import { createCSV } from "./create-csv.js";

export const concatSameHeaderCSV = async (
  dirPath: string,
  title: string,
  ...data: string[]
) => {
  // if not exists, create directory
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  // remove first line excluding first csv
  const csvBody = data
    .map((csv, i) => {
      if (i === 0) {
        return csv;
      } else {
        return csv.split("\n").slice(1).join("\n");
      }
    })
    .join("\n");

  createCSV(dirPath, title, csvBody);
};

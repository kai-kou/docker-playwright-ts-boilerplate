import fs from "fs";

export const createCSV = async (
  dirPath: string,
  title: string,
  data: string
) => {
  // if not exists, create directory
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // create csv file
  const filePath = `${dirPath}/${title}.csv`;
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

import fs from "fs";

export const createDirIfNotExists = (dir: string): Promise<void> => {
  const dirExists = fs.existsSync(dir);

  if (!dirExists) {
    fs.mkdirSync(dir);
  }

  return;
};

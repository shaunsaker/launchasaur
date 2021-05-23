import path from "path";

export const getFilenameFromFilepath = (filepath: string): string =>
  path.basename(filepath);

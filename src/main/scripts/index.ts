import { spawnProcess } from "./utils";

export const runScript = async (script: string) => {
  const response = await spawnProcess({ command: script });

  return response;
};

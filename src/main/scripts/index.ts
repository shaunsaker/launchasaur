import { spawnProcess } from "./utils";

export const runScript = async (script: string) => {
  // we receipt the script as a single string so we need to
  // extract the process and args
  const process = script.split(" ")[0];
  const argsString = script.replace(`${process} `, "");
  const args = argsString.split(" ");

  const response = await spawnProcess({ process, args });

  return response;
};

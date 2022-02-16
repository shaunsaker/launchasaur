import spawn from "cross-spawn";

export const exitWithError = (message?: string) => {
  if (message) {
    console.error(message);
  }

  process.exit(1);
};

export const spawnProcess = (
  {
    command,
    showLogs,
    workingDir = ".",
  }: {
    command: string;
    showLogs?: boolean;
    workingDir?: string;
  },
  message?: string,
): {
  message: string;
  error?: boolean;
} => {
  const options: {
    stdio?: any; // TS complains when setting it to string because we can't import types for it
    cwd?: string;
  } = {
    cwd: workingDir,
  };

  if (showLogs) {
    options.stdio = "inherit";
  }

  const ret = spawn.sync(command, options);

  if (ret.status !== 0) {
    return {
      message: message || ret.stderr?.toString() || ret.error?.message,
      error: true,
    };
  }

  return { message: ret.stdout?.toString() };
};

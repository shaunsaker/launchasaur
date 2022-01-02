import * as spawn from "cross-spawn"; // eslint-disable-line
import * as fs from "fs";
import initEnv from "dotenv";

initEnv.config({
  path: "../.env.dev",
});

export const exitWithError = (message?: string) => {
  if (message) {
    console.error(message);
  }

  process.exit(1);
};

export const execChildProcess = (
  {
    process,
    args,
    showLogs,
    workingDir = ".",
  }: {
    process: string;
    args: string[];
    showLogs?: boolean;
    workingDir?: string;
  },
  message?: string,
) => {
  const options: {
    stdio?: any; // TS complains when setting it to string because we can't import types for it
    cwd?: string;
  } = {
    cwd: workingDir,
  };

  if (showLogs) {
    options.stdio = "inherit";
  }

  const ret = spawn.sync(process, args, options);

  if (ret.status !== 0) {
    exitWithError(message || ret.stderr?.toString() || ret.error?.message);
  }

  return ret.stdout?.toString();
};

export const checkGitForUnstagedChanges = () => {
  // Only proceed if there are no uncommitted changes
  execChildProcess(
    { process: "git", args: ["diff", "--exit-code"] },
    "Please commit your unstaged changes!",
  );
};

export const getArgs = () => {
  const args = process.argv.slice(2);
  const version = args[0];
  const environment = args[1];
  const client = environment?.includes("client");
  const production = environment?.includes("production");

  return {
    version,
    client,
    production,
  };
};

export const getLatestReleaseNumber = (version: string): number => {
  // get the latest build number for the given version using git tags
  // release tags follow the format, VERSION.BUILD, e.g. 1.9.0-5
  const tagPrefix = `${version}-`;
  const existingBuildTags = execChildProcess({
    process: "git",
    args: ["tag", "-l", `${tagPrefix}*`],
  })
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length !== 0)
    .map((l) => parseInt(l.replace(tagPrefix, ""), 10))
    .sort((a, b) => b - a);
  const latestBuildNumber = existingBuildTags[0];

  return latestBuildNumber;
};

export const updatePackageJson = (field: string, value: string): void => {
  const pkg = JSON.parse(fs.readFileSync("package.json").toString());

  pkg[field] = value;

  fs.writeFileSync("package.json", `${JSON.stringify(pkg, undefined, 2)}\n`);
};

export const getReleaseTagName = (version: string, buildNumber: number) => {
  return `${version}-${buildNumber}`;
};

export const getReleaseBranchName = (version: string, buildNumber: number) => {
  return `release/${getReleaseTagName(version, buildNumber)}`;
};

/**
 * Creates and checkout a new branch
 * creates a commit and tags it with the given releaseName and pushes them to origin.
 */
export const createRelease = (releaseName: string): void => {
  const branchName = `release/${releaseName}`;
  execChildProcess({
    process: "git",
    args: ["checkout", "-b", branchName],
    showLogs: true,
  });

  const commitMessage = releaseName;
  execChildProcess({
    process: "git",
    args: [
      "commit",
      "--no-verify",
      "--allow-empty",
      "-m",
      `${commitMessage}`,
      "package.json",
    ],
    showLogs: true,
  });

  const tagName = releaseName;
  execChildProcess({ process: "git", args: ["tag", tagName], showLogs: true });

  execChildProcess({
    process: "git",
    args: ["push", "--no-verify", "--set-upstream", "origin", branchName],
    showLogs: true,
  });

  execChildProcess({
    process: "git",
    args: ["push", "origin", tagName, "--no-verify"],
    showLogs: true,
  });
};

/**
 * Publishes the release builds to Github
 */
const publishRelease = (): void => {
  execChildProcess({
    process: "yarn",
    args: ["electron-forge", "publish"],
    showLogs: true,
  });
};

(async () => {
  // checkGitForUnstagedChanges();

  const { version } = getArgs();

  if (!version) {
    exitWithError(
      "Please provide a version to release, e.g. yarn deploy 1.9.0",
    );
  }

  const latestBuildNumber = getLatestReleaseNumber(version) || 0; // it can be undefined for the first build that is released

  // only internal deployments create releases
  const nextBuildNumber = latestBuildNumber + 1;

  updatePackageJson("version", version);
  updatePackageJson("build", nextBuildNumber.toString());

  const releaseName = getReleaseTagName(version, nextBuildNumber);
  createRelease(releaseName);

  publishRelease();
})();

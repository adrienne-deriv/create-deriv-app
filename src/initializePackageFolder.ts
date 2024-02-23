import fs from "fs-extra";
import path from "path";
import { rootDir } from "./consts";
import { error } from "./logger";

export const initializePackageFolder = (packageName: string) => {
  const packagePath = path.join(rootDir, packageName);
  if (fs.existsSync(packagePath)) {
    error(`The package ${packageName} already exists!`);
    process.exit(1);
  } else {
    fs.mkdirSync(path.join(rootDir, packageName));
  }
};

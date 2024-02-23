import { cliDir, rootDir } from "../consts";
import { addDependency } from "./addDependency";
import fs from "fs-extra";
import path from "path";

export const sassInstaller = (packageDir: string, bundler: string) => {
  if (bundler === "webpack") {
    addDependency({
      packageDir,
      dependency: "sassWebpack",
      isDevDependency: true,
    });
  } else {
    addDependency({
      packageDir,
      dependency: "sassVite",
      isDevDependency: true,
    });
  }
};

import fs from "fs-extra";
import path from "path";
import { cliDir, rootDir } from "../consts";

export const viteInstaller = (packageDir: string) => {
  const viteTemplatePath = path.join(cliDir, "templates/vite/");
  const viteDestinationPath = path.join(rootDir, packageDir) + "/";
  fs.copySync(viteTemplatePath, viteDestinationPath);
};

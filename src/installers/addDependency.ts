import fs from "fs-extra";
import path from "path";
import { dependencyVersions, rootDir } from "../consts";

export const addDependency = ({
  packageDir,
  dependency,
  isDevDependency,
}: {
  packageDir: string;
  dependency: string;
  isDevDependency: boolean;
}) => {
  const packageJSON = fs.readJSONSync(path.join(packageDir, "package.json"));

  const peerDependencies = dependencyVersions[dependency];

  Object.keys(peerDependencies).forEach((dependency) => {
    if (isDevDependency) {
      packageJSON.devDependencies[dependency] = peerDependencies[dependency];
    } else {
      packageJSON.dependencies[dependency] = peerDependencies[dependency];
    }
  });

  fs.writeJSONSync(path.join(packageDir, "package.json"), packageJSON, {
    spaces: 2,
  });
};

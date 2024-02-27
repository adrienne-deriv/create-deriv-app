import fs from 'fs-extra';
import { join } from 'path';
import { dependencyVersions } from './consts';

export const addDependency = ({
    packagePath,
    dependency,
    isDevDependency,
    bundler,
}: {
    packagePath: string;
    dependency: string;
    isDevDependency: boolean;
    bundler?: string;
}) => {
    const packageJsonPath = join(packagePath, 'package.json');
    const packageJSON = fs.readJSONSync(packageJsonPath);

    let peerDependencies = dependencyVersions[dependency];
    if (bundler) {
        if (dependencyVersions[dependency]?.bundlers) {
            peerDependencies = dependencyVersions[dependency].bundlers[bundler];
        }
    }

    Object.keys(peerDependencies).forEach(dependency => {
        if (isDevDependency) {
            packageJSON.devDependencies[dependency] = peerDependencies[dependency];
        } else {
            packageJSON.dependencies[dependency] = peerDependencies[dependency];
        }
    });

    fs.writeJSONSync(packageJsonPath, packageJSON, {
        spaces: 2,
    });
};

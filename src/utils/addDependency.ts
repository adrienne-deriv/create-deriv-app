import fs from 'fs-extra';
import { join } from 'path';
import { dependencyVersions } from './consts';

export const addDependency = ({
    packagePath,
    dependency,
    isDevDependency,
    scripts,
}: {
    packagePath: string;
    dependency: string;
    isDevDependency: boolean;
    scripts?: Record<string, string>;
}) => {
    const packageJsonPath = join(packagePath, 'package.json');
    const packageJSON = fs.readJSONSync(packageJsonPath);

    let peerDependencies = dependencyVersions[dependency];

    Object.keys(peerDependencies).forEach(dependency => {
        if (isDevDependency) {
            packageJSON.devDependencies[dependency] = peerDependencies[dependency];
        } else {
            packageJSON.dependencies[dependency] = peerDependencies[dependency];
        }
    });

    if (scripts) {
        Object.keys(scripts).forEach(command => (packageJSON.scripts[command] = scripts[command]));
    }

    fs.writeJSONSync(packageJsonPath, packageJSON, {
        spaces: 2,
    });
};

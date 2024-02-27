import { existsSync, readJSONSync } from 'fs-extra';
import { join } from 'path';

export default function loadPackageJSON(packagePath: string) {
    const packageJsonPath = join(packagePath, 'package.json');

    if (!existsSync(packageJsonPath)) {
        throw new Error('package.json does not exist within the package folder.');
    }
    const packageJSON = readJSONSync(packageJsonPath);

    return packageJSON;
}

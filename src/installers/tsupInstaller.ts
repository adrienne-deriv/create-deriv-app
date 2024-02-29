import fs from 'fs-extra';
import path, { join } from 'path';
import { rootPath, templatesPath } from '../utils/consts';
import { LibraryDependencies } from 'src/utils';
import { loadPackageJSON } from 'src/loaders';

export const tsupInstaller = (packagePath: string, libraryDependencies: LibraryDependencies) => {
    const tsupTemplatePath = join(templatesPath, 'tsup');
    const destinationPath = join(rootPath, packagePath) + '/';
    fs.copySync(tsupTemplatePath, destinationPath);

    const packageJSON = loadPackageJSON(packagePath);
    packageJSON.name = libraryDependencies.name;
    packageJSON.description = libraryDependencies.description;
    packageJSON.repository = libraryDependencies.repository;
    packageJSON.version = libraryDependencies.version;

    const packageJSONPath = path.join(destinationPath, 'package.json');
    fs.writeJSONSync(packageJSONPath, packageJSON, {
        spaces: 2,
    });
};

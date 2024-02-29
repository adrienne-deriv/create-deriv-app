import { addDependency } from '../utils/addDependency';
import { templatesPath, rootPath } from '../utils/consts';
import path from 'path';
import fs from 'fs-extra';

export const huskyInstaller = (packagePath: string) => {
    addDependency({
        packagePath,
        dependency: 'husky',
        isDevDependency: true,
        scripts: {
            prepare: 'husky install',
        },
    });

    const huskyTemplatesPath = path.join(templatesPath, 'husky');

    const destinationPath = path.join(rootPath, packagePath) + '/';
    fs.copySync(huskyTemplatesPath, destinationPath, {
        overwrite: true,
    });
};

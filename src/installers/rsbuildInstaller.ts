import fs from 'fs-extra';
import { join } from 'path';
import { rootPath, templatesPath } from '../utils/consts';
import { eslintInstaller } from './eslintInstaller';
import { huskyInstaller } from './huskyInstaller';

export const rsbuildInstaller = (packagePath: string) => {
    const rsbuildTemplatePath = join(templatesPath, 'rsbuild');
    const destinationPath = join(rootPath, packagePath) + '/';
    fs.copySync(rsbuildTemplatePath, destinationPath);

    eslintInstaller(packagePath);
    huskyInstaller(packagePath);
};

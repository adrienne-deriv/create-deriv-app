import fs from 'fs-extra';
import { join } from 'path';
import { rootPath, templatesPath } from '../utils/consts';
import { eslintInstaller } from './eslintInstaller';
import { huskyInstaller } from './huskyInstaller';

export const viteInstaller = (packagePath: string) => {
    const viteTemplatePath = join(templatesPath, 'vite');
    const destinationPath = join(rootPath, packagePath) + '/';
    fs.copySync(viteTemplatePath, destinationPath);

    eslintInstaller(packagePath);
    huskyInstaller(packagePath);
};

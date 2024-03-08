import { configurePackageJSON, copyTemplates } from '../utils';
import { eslintInstaller } from './eslintInstaller';
import { huskyInstaller } from './huskyInstaller';
import { jestInstaller } from './jestInstaller';

export const viteInstaller = (packagePath: string) => {
    copyTemplates(packagePath, 'vite');
    copyTemplates(packagePath, 'actions');

    eslintInstaller(packagePath, false);
    huskyInstaller(packagePath);
    jestInstaller(packagePath);

    configurePackageJSON({
        packagePath,
        name: packagePath,
    });
};

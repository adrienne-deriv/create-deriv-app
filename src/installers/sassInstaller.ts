import { PackageDependencies } from 'src/utils';
import { addDependency } from '../utils/addDependency';

export const sassInstaller = (packagePath: string, packageDependencies: PackageDependencies) => {
    addDependency({
        packagePath,
        dependency: 'sass',
        isDevDependency: true,
    });
};

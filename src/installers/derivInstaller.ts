import { addDependency } from '../utils/addDependency';

export const derivInstaller = (packagePath: string, derivPackages: string[]) => {
    for (let i = 0; i < derivPackages.length; i++) {
        addDependency({
            packagePath,
            dependency: derivPackages[i],
            isDevDependency: false,
        });
    }
};

import { addDependency } from '../utils/addDependency';

export const styledComponentsInstaller = (packagePath: string) => {
    addDependency({
        packagePath,
        dependency: 'styledComponents',
        isDevDependency: false,
    });
};

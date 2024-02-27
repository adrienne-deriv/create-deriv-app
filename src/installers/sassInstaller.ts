import { addDependency } from '../utils/addDependency';

export const sassInstaller = (packagePath: string, bundler: string) => {
    addDependency({
        packagePath,
        dependency: 'sass',
        isDevDependency: true,
        bundler,
    });
};

import { templatesPath } from '../utils/consts';
import { addDependency } from '../utils/addDependency';
import fs from 'fs-extra';
import { join } from 'path';

export const tailwindInstaller = (packagePath: string) => {
    addDependency({
        packagePath,
        dependency: 'tailwind',
        isDevDependency: true,
    });

    const tailwindTemplatePath = join(templatesPath, 'tailwind');

    fs.copySync(tailwindTemplatePath, packagePath, {
        overwrite: true,
    });
};

import { join } from 'path';
import { templatesPath } from 'src/utils/consts';
import { addDependency } from '../utils/addDependency';
import fs from 'fs-extra';

export const eslintInstaller = (packagePath: string) => {
    const eslintTemplatePath = join(templatesPath, 'eslint');

    fs.copySync(eslintTemplatePath, packagePath, {
        overwrite: true,
    });

    addDependency({
        packagePath,
        dependency: 'eslint',
        isDevDependency: true,
    });
};

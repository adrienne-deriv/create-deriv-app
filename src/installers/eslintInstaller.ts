import { join } from 'path';
import { templatesPath, rootPath } from 'src/utils/consts';
import { addDependency } from '../utils/addDependency';
import fs from 'fs-extra';
import path from 'path';

export const eslintInstaller = (packagePath: string) => {
    const eslintTemplatePath = join(templatesPath, 'linting');

    const destinationPath = path.join(rootPath, packagePath) + '/';
    fs.copySync(eslintTemplatePath, destinationPath, {
        overwrite: true,
    });
    fs.copySync(eslintTemplatePath, destinationPath, {
        overwrite: true,
    });

    addDependency({
        packagePath,
        dependency: 'linting',
        isDevDependency: true,
        scripts: {
            lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
            'test:eslint': 'eslint "./src/**/*.?(js|jsx|ts|tsx)"',
        },
    });
};

import * as p from '@clack/prompts';
import { info } from './logger';
import fs from 'fs-extra';
import { rootPath } from './consts';
import path from 'path';

const validateName = (name: string) => {
    if (!name.length) return 'A package name is required';

    const isPackageExists = fs.existsSync(path.join(rootPath, name));
    if (isPackageExists) return `The package folder ${name} already exists`;
    return;
};

export const promptDependencies = async () => {
    const dependencies = await p.group(
        {
            name: () =>
                p.text({
                    message: 'What is the name of the new V2 package?',
                    validate: validateName,
                }),
            isLibrary: () =>
                p.confirm({
                    message: 'Is this for a library?',
                }),
            bundler: () =>
                p.select({
                    message: 'Which bundler would you like to integrate?',
                    options: [
                        { value: 'webpack', label: 'Webpack' },
                        { value: 'vite', label: 'Vite' },
                        { value: 'rsbuild', label: 'Rsbuild' },
                    ],
                    initialValue: 'webpack',
                }),
            styling: () =>
                p.select({
                    message: 'Which styling library will you be using?',
                    options: [
                        { value: 'tailwind', label: 'Tailwind' },
                        { value: 'sass', label: 'Sass' },
                        { value: 'styledComponents', label: 'Styled Components' },
                        { value: 'cssModules', label: 'CSS Modules' },
                    ],
                    initialValue: 'tailwind',
                }),
            shouldUseReactQuery: () =>
                p.confirm({
                    message: 'Should React Query be integrated? (I dont think we need this once deriv-api-v2 is out)',
                }),
            derivPackages: () =>
                p.multiselect({
                    message: 'Which Deriv packages should be included?',
                    options: [
                        { value: 'derivUi', label: '@deriv/ui' },
                        { value: 'derivUtils', label: '@deriv/utils' },
                        { value: 'derivIcons', label: '@deriv/quill-icons' },
                    ],
                }),
            githubActions: () =>
                p.multiselect({
                    message: 'Which Github actions should be included?',
                    options: [{ value: 'GABuildAndTest', label: 'Build and Test' }],
                }),
            shouldUseHusky: () =>
                p.confirm({
                    message: 'Should precommit hooks be included?',
                }),
            git: () => {
                return p.confirm({
                    message: 'Should we initialize a Git repository and stage the changes?',
                });
            },
        },
        {
            onCancel: () => process.exit(1),
        }
    );

    info(`Creating ${dependencies.name} package...`);

    return dependencies;
};

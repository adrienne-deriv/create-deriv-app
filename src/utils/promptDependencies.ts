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

export type LibraryDependencies = {
    name: string;
    type: 'library';
    version: string;
    description: string;
    repository?: string;
};

export type PackageDependencies = {
    name: string;
    type: 'package';
    bundler: 'vite' | 'rsbuild';
    styling: 'sass' | 'tailwind' | 'styledComponents' | 'cssModules';
    shouldUseReactQuery: boolean;
    derivPackages: ('derivUi' | 'derivUtils' | 'derivIcons')[];
    githubActions: 'buildAndTest'[];
    shouldBootstrap: boolean;
};

type Dependencies = LibraryDependencies | PackageDependencies;

export const promptDependencies = async (): Promise<Dependencies> => {
    const packageName = await p.text({
        message: 'What is the name of the new V2 package?',
        validate: validateName,
    });
    const isLibrary = await p.confirm({
        message: 'Is this for a library?',
        initialValue: false,
    });

    if (isLibrary) {
        const description = await p.text({
            message: 'Provide a short description of the library',
            validate(value) {
                if (value.length === 0) return 'A description is required';
            },
        });
        const repositoryUrl = await p.text({
            message: 'Provide (if any) a Github repository url',
            initialValue: `https://github.com/binary-com/${packageName.toString()}`,
        });
        const initialVersion = await p.text({
            message: "What's the initial version of this library?",
            initialValue: '0.0.1-beta',
        });
        const libraryDependencies: LibraryDependencies = {
            name: packageName.toString(),
            description: description.toString(),
            repository: repositoryUrl.toString(),
            version: initialVersion.toString(),
            type: 'library',
        };

        return libraryDependencies;
    }
    const dependencies = await p.group<PackageDependencies>(
        {
            bundler: () =>
                p.select({
                    message: 'Which bundler would you like to integrate?',
                    options: [
                        { value: 'vite', label: 'Vite' },
                        { value: 'rsbuild', label: 'Rsbuild' },
                    ],
                    initialValue: 'webpack',
                }),
            styling: () =>
                p.select({
                    message: 'Which styling library will you be using?',
                    options: [
                        { value: 'tailwind', label: 'Tailwind', hint: 'includes twMerge and clsx' },
                        { value: 'sass', label: 'Sass', hint: 'includes clsx' },
                        { value: 'styledComponents', label: 'Styled Components' },
                        { value: 'cssModules', label: 'CSS Modules' },
                    ],
                    initialValue: 'tailwind',
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
                    options: [{ value: 'buildAndTest', label: 'Build and Test' }],
                }),
            shouldBootstrap: () => {
                return p.confirm({
                    message: 'Should we initialize a Git repository and bootstrap the package?',
                    initialValue: false,
                });
            },
        },
        {
            onCancel: () => process.exit(1),
        }
    );

    const packageDependencies: PackageDependencies = {
        name: packageName.toString(),
        type: 'package',
        ...dependencies,
    };

    return packageDependencies;
};

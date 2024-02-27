import {
    derivInstaller,
    rsbuildInstaller,
    sassInstaller,
    styledComponentsInstaller,
    tailwindInstaller,
    viteInstaller,
} from './installers';
import { BANNER, initializePackageFolder, promptDependencies, info } from './utils';
import gradient from 'gradient-string';

const main = async () => {
    const derivGradient = gradient('red', 'red');
    console.log(derivGradient.multiline(BANNER));
    console.log('\n');
    const dependencies = await promptDependencies();
    const packageName = dependencies.name;

    initializePackageFolder(packageName);

    switch (dependencies.bundler) {
        case 'vite':
            viteInstaller(packageName);
            break;
        case 'rsbuild':
            rsbuildInstaller(packageName);
            break;
        default:
            break;
    }

    switch (dependencies.styling) {
        case 'tailwind':
            tailwindInstaller(packageName);
            break;
        case 'sass':
            sassInstaller(packageName, dependencies.bundler);
            break;
        case 'styledComponents':
            styledComponentsInstaller(packageName);
            break;
        default:
            break;
    }

    if (dependencies.derivPackages.length) {
        derivInstaller(packageName, dependencies.derivPackages);
    }

    info(`Successfully initialized package! Navigate to ${packageName} folder and run the following commands:`);
    info(`cd ${packageName}`);
    info('npm install');
    info('npm run dev');
};

main();

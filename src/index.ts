import {
    derivInstaller,
    rsbuildInstaller,
    sassInstaller,
    tsupInstaller,
    styledComponentsInstaller,
    tailwindInstaller,
    viteInstaller,
} from './installers';
import {
    BANNER,
    initializePackageFolder,
    promptDependencies,
    info,
    getCloudflarePagesSteps,
    preparePackage,
} from './utils';
import gradient from 'gradient-string';
import { outro } from '@clack/prompts';

const main = async () => {
    const derivGradient = gradient('red', 'red');
    console.log(derivGradient.multiline(BANNER));
    console.log('\n');
    const dependencies = await promptDependencies();
    const packageName = String(dependencies.name);

    initializePackageFolder(packageName);

    if (dependencies.type === 'library') {
        tsupInstaller(packageName, dependencies);
        return;
    }

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
            sassInstaller(packageName, dependencies);
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

    // if (dependencies.githubActions.length) {
    //     if (dependencies.githubActions.includes('buildAndTest')) {
    //         warn(getCloudflarePagesSteps(packageName));
    //     }
    // }
    if (dependencies.shouldBootstrap) await preparePackage(packageName);

    outro(`Successfully initialized package! Navigate to ${packageName} folder and run the following commands:`);
    info(`  cd ${packageName}`);
    if (!dependencies.shouldBootstrap) {
        info('  git init');
        info('  npm install');
        info('  npm run prepare');
    }
    info('  npm run dev');
};

main();

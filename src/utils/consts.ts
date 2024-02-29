import boxen from 'boxen';
import path from 'path';
import { fileURLToPath } from 'url';

// With the move to TSUP as a build tool, this keeps path routes in other files (installers, loaders, etc) in check more easily.
// Path is in relation to a single index.js file inside ./dist
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);

export const rootPath = process.cwd();
export const cliPath = path.join(distPath, '../src');
export const templatesPath = path.join(cliPath, 'templates');

export const BANNER = [
    '     ____  __________  _____    __    _    _____  ',
    '    / __ / ____/ __ /  _/ |  / /   | |  / /__  ',
    '   / / / / __/ / /_/ // / | | / /____| | / /__/ / ',
    '  / /_/ / /___/ _, _// /  | |/ /_____/ |/ // __/  ',
    ' /_____/_____/_/ |_/___/  |___/      |___//____/  ',
].join('\n');

export const dependencyVersions = {
    tailwind: {
        tailwindcss: '^3.3.5',
        autoprefixer: '^10.4.14',
        postcss: '^8.4.31',
        prettier: '^3.1.0',
        'prettier-plugin-tailwindcss': '^0.5.7',
        clsx: '^2.1.0',
        'tailwind-merge': '^2.2.1',
    },
    derivUtils: {
        '@deriv-com/utils': '^0.0.8',
    },
    derivIcons: {
        '@deriv/quill-icons': '^1.18.4',
    },
    derivUi: {
        '@deriv/ui': '^0.8.0',
    },
    linting: {
        '@deriv/eslint-config-deriv': '^2.0.0-beta.1',
        'eslint-plugin-prettier': '^3.3.1',
        stylelint: '^13.13.1',
        'stylelint-config-prettier': '^8.0.2',
        'stylelint-formatter-pretty': '^2.1.1',
        'stylelint-no-unsupported-browser-features': '^4.0.0',
        'stylelint-selector-bem-pattern': '^2.1.0',
        prettier: '^2.1.2',
    },
    husky: {
        'lint-staged': '^10.4.0',
        husky: '^7.0.0',
    },
    sass: {
        sass: '^1.70.0',
        clsx: '^2.1.0',
    },
    sassWebpack: {
        sass: '^1.70.0',
    },
    styledComponents: {
        'styled-components': '^6.1.8',
    },
    reactQuery: {
        '@tanstack/react-query': '^5.24.1',
    },
};

export const getCloudflarePagesSteps = (packageName: string) => {
    console.log(
        boxen('STEPS TO DEPLOY THE PACKAGE TO CLOUDFLARE PAGES USING GITHUB ACTIONS', {
            padding: 2,
        })
    );
    console.log(`
    To deploy this package to Cloudflare Pages, perform the following steps:
    
    1. Create a new repository in Github
    2. Set the following environment variables in your repository in: Settings > Secrets and variables > Actions > New repository secret
       Add the following environment variables (to find your tokens, navigate to the Cloudflare Pages dashboard):
       CLOUDFLARE_ACCOUNT_ID=****
       CLOUDFLARE_API_TOKEN=****
       
    3. Navigate to ${packageName} folder and push the template package into the newly created repository
    `);
};

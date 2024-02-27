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
    '    ____   ______ ____   ____ _    ___    __ _____',
    '   / __  / ____// __  /  _/| |  / | |  / /|____/ / ',
    '  / / / // __/  / /_/ / / /  | | / /| | / / __/ / ',
    ' / /_/ // /___ / _, _/_/ /   | |/ / | |/ / / __/ ',
    '/_____//_____//_/ |_|/___/   |___/  |___/ /____/',
].join('\n');

export const dependencyVersions = {
    tailwind: {
        tailwindcss: '^3.3.5',
        autoprefixer: '^10.4.14',
        postcss: '^8.4.31',
        prettier: '^3.1.0',
        'prettier-plugin-tailwindcss': '^0.5.7',
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
    eslint: {
        '@deriv/eslint-config-deriv': '^2.0.0-beta.1',
        'eslint-plugin-prettier': '^3.3.1',
    },
    husky: {
        'lint-staged': '^10.4.0',
        husky: '^7.0.0',
    },
    sass: {
        bundlers: {
            vite: {
                sass: '^1.70.0',
            },
            webpack: {
                sass: '^1.70.0',
            },
        },
    },
    styledComponents: {
        'styled-components': '^6.1.8',
    },
    reactQuery: {
        '@tanstack/react-query': '^5.24.1',
    },
};

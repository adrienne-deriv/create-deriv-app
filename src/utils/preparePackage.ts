import { exec } from 'child_process';
import util from 'util';
import { spinner } from '@clack/prompts';

const asyncExec = util.promisify(exec);

export async function preparePackage(packagePath: string) {
    const s = spinner();
    try {
        s.start('Initializing Git repository...');
        await asyncExec(`cd ${packagePath} && git init`);
        s.message('Bootstrapping dependencies...');
        await asyncExec(`cd ${packagePath} && npm install`);
        s.message('Preparing precommit hooks...');
        await asyncExec(`cd ${packagePath} && npm run prepare`);
        s.stop();
    } catch (err) {
        console.log(err);
        s.stop('There was an error in bootstrapping the package');
    }
}

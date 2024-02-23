import { BANNER } from "./consts";
import { initializePackageFolder } from "./initializePackageFolder";
import { tailwindInstaller } from "./installers/tailwindInstaller";
import { viteInstaller } from "./installers/viteInstaller";
import { info } from "./logger";
import { promptDependencies } from "./promptDependencies";
import gradient from "gradient-string";

const main = async () => {
  const derivGradient = gradient("red", "red");
  console.log(derivGradient.multiline(BANNER));
  console.log("\n");
  const dependencies = await promptDependencies();
  const packageName = dependencies.name;

  initializePackageFolder(packageName);

  if (dependencies.bundler === "vite") {
    viteInstaller(packageName);
  }
  if (dependencies.styling === "tailwind") {
    tailwindInstaller(packageName);
  }

  info(
    `Successfully initialized package! Navigate to ${packageName} folder and run the following commands:`
  );
  info(`cd ${packageName}`);
  info("npm install");
  info("npm run dev");
};

main();

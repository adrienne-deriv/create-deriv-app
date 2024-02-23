import path from "path";
import { fileURLToPath } from "url";

// With the move to TSUP as a build tool, this keeps path routes in other files (installers, loaders, etc) in check more easily.
// Path is in relation to a single index.js file inside ./dist
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const rootDir = path.join(distPath, "../");
export const cliDir = path.join(distPath, "../src");

export const BANNER = [
  "    ____   ______ ____   ____ _    ___    __ _____",
  "   / __  / ____// __  /  _/| |  / | |  / /|____/ / ",
  "  / / / // __/  / /_/ / / /  | | / /| | / / __/ / ",
  " / /_/ // /___ / _, _/_/ /   | |/ / | |/ / / __/ ",
  "/_____//_____//_/ |_|/___/   |___/  |___/ /____/",
].join("\n");
export const dependencyVersions = {
  tailwind: {
    tailwindcss: "^3.3.5",
    autoprefixer: "^10.4.14",
    postcss: "^8.4.31",
    prettier: "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.7",
  },
  sassVite: {
    sass: "^1.70.0",
  },
  sassWebpack: {
    sass: "^1.70.0",
  },
};

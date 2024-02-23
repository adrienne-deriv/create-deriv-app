import { cliDir, rootDir } from "../consts";
import { addDependency } from "./addDependency";
import fs from "fs-extra";
import path from "path";

export const tailwindInstaller = (packageDir: string) => {
  addDependency({
    packageDir,
    dependency: "tailwind",
    isDevDependency: true,
  });

  const tailwindConfig = fs.readFileSync(
    path.join(cliDir, "templates/tailwind/tailwind.config.ts"),
    "utf-8"
  );
  const postCssConfig = fs.readFileSync(
    path.join(cliDir, "templates/tailwind/postcss.config.js"),
    "utf-8"
  );
  const indexCss = fs.readFileSync(
    path.join(cliDir, "templates/tailwind/index.css"),
    "utf-8"
  );

  fs.writeFileSync(path.join(packageDir, "tailwind.config.ts"), tailwindConfig);
  fs.writeFileSync(path.join(packageDir, "postcss.config.js"), postCssConfig);
  fs.writeFileSync(path.join(packageDir, "/src/index.css"), indexCss);
};

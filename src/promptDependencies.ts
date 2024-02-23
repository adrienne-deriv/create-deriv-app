import * as p from "@clack/prompts";
import { info } from "./logger";

type Dependency = {
  tailwind: boolean;
  derivUi: boolean;
  sass: boolean;
  vite: boolean;
  webpack: boolean;
};

const validateName = (input: string) => {
  if (!input.length) return "A package name is required";
  return;
};

export const promptDependencies = async () => {
  const dependencies = await p.group(
    {
      name: () =>
        p.text({
          message: "What is the name of the new V2 package?",
          validate: validateName,
        }),
      bundler: () =>
        p.select({
          message: "Which bundler would you like to integrate?",
          options: [
            { value: "webpack", label: "Webpack" },
            { value: "vite", label: "Vite" },
            { value: "rspack", label: "Rspack" },
          ],
          initialValue: "webpack",
        }),
      styling: () =>
        p.select({
          message: "Which styling library will you be using?",
          options: [
            { value: "tailwind", label: "Tailwind" },
            { value: "sass", label: "Sass" },
            { value: "cssModules", label: "CSS Modules" },
          ],
          initialValue: "tailwind",
        }),
      git: () => {
        return p.confirm({
          message:
            "Should we initialize a Git repository and stage the changes?",
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

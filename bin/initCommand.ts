#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const __root = path.resolve(__dirname, "../");
const templatesPath = path.join(__root, "templates");

export async function initCommand(): Promise<void> {
  const answers = await inquirer.prompt<{
    template: "react" | "nextjs";
  }>([
    {
      type: "list",
      name: "template",
      message: "Select framework:",
      choices: ["react", "nextjs"],
    },
  ]);

  const { template } = answers;

  // Define multiple copy pairs
  const filesToCopy: { from: string; to: string }[] = [
    {
      from: path.resolve(templatesPath, template, "css", "index.css"),
      to: path.resolve(process.cwd(), "src", "index.css"),
    },
    // {
    //   from: path.resolve(
    //     templatesPath,
    //     template,
    //     "config",
    //     "tailwind.config.js"
    //   ),
    //   to: path.resolve(process.cwd(), "tailwind.config.js"),
    // },
    // {
    //   from: path.resolve(
    //     templatesPath,
    //     template,
    //     "config",
    //     "postcss.config.js"
    //   ),
    //   to: path.resolve(process.cwd(), "postcss.config.js"),
    // },
  ];

  try {
    for (const file of filesToCopy) {
      await fs.copy(file.from, file.to, { overwrite: true });
      console.log(
        chalk.green(`✔ Copied ${path.basename(file.from)} to ${file.to}`)
      );
    }
    console.log(chalk.green(`\n${template} base configuration completed.`));
  } catch (err) {
    console.error(chalk.red("Error copying configuration files:"), err);
    process.exit(1);
  }
}

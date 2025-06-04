#!/usr/bin/env node

import chalk from "chalk";
import { execSync } from "child_process";
import { Command } from "commander";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();
const __root = path.resolve(__dirname, "../");
const templatesPath = path.join(__root, "templates");
const componentsPath = path.join(__root, "components");

async function initCommand(): Promise<void> {
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

  const filesToCopy: { from: string; to: string }[] = [
    {
      from: path.resolve(templatesPath, template, "css", "index.css"),
      to: path.resolve(process.cwd(), "src", "index.css"),
    },
    {
      from: path.resolve(templatesPath, template, "config", "cn.ts"),
      to: path.resolve(
        process.cwd(),
        "src",
        "uifyit",
        "utils",
        "cn",
        "index.ts"
      ),
    },
  ];

  const allPackages = new Set<string>();

  try {
    for (const file of filesToCopy) {
      await fs.copy(file.from, file.to, { overwrite: true });
      console.log(
        chalk.green(`✔ Copied ${path.basename(file.from)} to ${file.to}`)
      );

      const content = await fs.readFile(file.from, "utf-8");
      const importRegex = /import .*? from ['"]([^\.\/][^'"]*)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        allPackages.add(match[1]);
      }
    }

    console.log(chalk.green(`\n${template} base configuration completed.`));

    if (allPackages.size > 0) {
      console.log(chalk.blue(`\n📦 Installing required dependencies...`));
      execSync(`npm install ${Array.from(allPackages).join(" ")}`, {
        stdio: "inherit",
      });
    }
  } catch (err) {
    console.error(chalk.red("Error copying configuration files:"), err);
    process.exit(1);
  }
}

async function addCommand(): Promise<void> {
  const categories = await fs.readdir(componentsPath);

  const { category } = await inquirer.prompt([
    {
      type: "list",
      name: "category",
      message: "Select category to add:",
      choices: categories,
    },
  ]);

  const itemsPath = path.join(componentsPath, category);
  const items = await fs.readdir(itemsPath);

  const { selectedItems } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedItems",
      message: `Select ${category} to add:`,
      choices: items,
    },
  ]);

  const allPackages = new Set<string>();
  const exportLines: Set<string> = new Set();
  const categoryTargetDir = path.join(process.cwd(), "src", "uifyit", category);

  for (const item of selectedItems) {
    const srcDir = path.join(itemsPath, item);
    const files = await fs.readdir(srcDir);

    for (const file of files) {
      const src = path.join(srcDir, file);
      const dest = path.join(categoryTargetDir, item, file);
      await fs.copy(src, dest);
      console.log(chalk.green(`✔ Copied ${file} to ${dest}`));

      const content = await fs.readFile(src, "utf-8");
      const importRegex = /import .*? from ['"]([^\.\/][^'"]*)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        allPackages.add(match[1]);
      }
    }

    exportLines.add(`export * from './${item}';`);
  }

  const indexPath = path.join(categoryTargetDir, "index.ts");

  let existingExports = "";
  if (await fs.pathExists(indexPath)) {
    existingExports = await fs.readFile(indexPath, "utf-8");
  }

  const allExportLines = new Set(
    existingExports.split("\n").filter(Boolean).concat(Array.from(exportLines))
  );

  await fs.outputFile(indexPath, Array.from(allExportLines).join("\n") + "\n");
  console.log(chalk.yellow(`📄 index.ts updated in ${categoryTargetDir}`));

  if (allPackages.size > 0) {
    console.log(chalk.blue(`\n📦 Installing all required dependencies...`));
    try {
      execSync(`npm install ${Array.from(allPackages).join(" ")}`, {
        stdio: "inherit",
      });
    } catch (error) {
      console.error(chalk.red("Failed to install dependencies"), error);
    }
  }
}
program.name("uifyit").description("Uify CLI tool").version("1.0.0");

program
  .command("init")
  .description("Initialize a new project")
  .action(initCommand);

program
  .command("add")
  .description("Add UI components or utilities")
  .action(addCommand);

program.parse(process.argv);

import chalk from 'chalk';
import ora from 'ora';
import { existsSync, mkdirSync } from 'node:fs';
import fs from 'node:fs/promises';
import path, { basename, extname } from 'node:path';
import Analyzer from './analyzer';
import Config from './config';
import Model from './model';

class Core {
  async processFiles() {
    try {
      const files = await fs.readdir(Config.getTargetDirectory(), {
        recursive: true,
        withFileTypes: true,
      });

      const vaultifyDirectory = path.join(Config.getTargetDirectory(), Config.get('output'));

      if (!existsSync(vaultifyDirectory)) {
        mkdirSync(vaultifyDirectory);
      }

      const filterFiles = files
        .filter((file) => file.isFile())
        .filter((file) => !file.parentPath.split(path.sep).includes(Config.get('output')))
        .map((file) => path.join(file.parentPath, file.name))
        .filter((filename) => Analyzer.getAnalyzer(filename) !== null);

      const total = filterFiles.length;

      for (let i = 0; i < filterFiles.length; i += 1) {
        const filePath = filterFiles[i];

        if (!filePath) {
          continue;
        }

        const filename = basename(filePath);
        const relativePath = path.relative(Config.getTargetDirectory(), filePath);

        const spinnerText = `${chalk.blue(`[${i + 1}/${total}]`)} Processing ${chalk.yellow(filename)}`;
        const spinner = ora({
          text: spinnerText,
          color: 'cyan',
        }).start();

        const content = await Analyzer.analyze(filePath);

        if (!content) {
          continue;
        }

        const result = await Model.prompt(content);

        if (result) {
          const normalizedTitle = result.title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replaceAll(' ', '_');

          let date = '';

          if (result.date) {
            date = `${result.date}_`;
          }

          const newFilename = `${date}${normalizedTitle}${extname(filePath)}`;
          const destinationDirectory = path.join(vaultifyDirectory, path.dirname(relativePath));

          if (!existsSync(destinationDirectory)) {
            mkdirSync(destinationDirectory);
          }

          const destinationPath = path.join(destinationDirectory, newFilename);
          await fs.copyFile(filePath, destinationPath);

          spinner.succeed(
            `${chalk.blue(`[${i + 1}/${total}]`)} ${filename} ${chalk.gray('->')} ${chalk.green(newFilename)}`,
          );
        }
      }
    } catch (error) {
      console.error('\nA fatal error occurred while processing the files:', error);
    }
  }
}

export default new Core();

import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import type { AnalyzerStrategy } from '../analyzer';

class TextAnalyzer implements AnalyzerStrategy {
  async getContent(filePath: string): Promise<string | null> {
    return await readFile(filePath, { encoding: 'utf-8' });
  }

  support(filePath: string): boolean {
    return extname(filePath).toLocaleLowerCase() === '.txt';
  }
}

export default new TextAnalyzer();

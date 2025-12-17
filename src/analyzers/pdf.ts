import { PDFParse } from 'pdf-parse';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import type { AnalyzerStrategy } from '../analyzer';

class PdfAnalyzer implements AnalyzerStrategy {
  async getContent(filePath: string): Promise<string | null> {
    const dataBuffer = await readFile(filePath);
    const data = await new PDFParse({ data: dataBuffer }).getText();

    return data.text;
  }

  support(filePath: string): boolean {
    return extname(filePath).toLocaleLowerCase() === '.pdf';
  }
}

export default new PdfAnalyzer();

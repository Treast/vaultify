import ImageAnalyzer from './analyzers/image';
import PdfAnalyzer from './analyzers/pdf';
import TextAnalyzer from './analyzers/text';

export interface AnalyzerStrategy {
  support(filePath: string): boolean;
  getContent(filePath: string): Promise<string | null>;
}

export type AnalysisResult = {
  date: string | null;
  title: string;
};

class Analyzer {
  private analyzers: AnalyzerStrategy[] = [TextAnalyzer, PdfAnalyzer, ImageAnalyzer];

  async analyze(filePath: string): Promise<string | null> {
    const analyzer = this.getAnalyzer(filePath);

    if (!analyzer) {
      return null;
    }

    return await analyzer.getContent(filePath);
  }

  getAnalyzer(filePath: string): AnalyzerStrategy | null {
    for (const analyzer of this.analyzers) {
      if (analyzer.support(filePath)) {
        return analyzer;
      }
    }

    return null;
  }
}

export default new Analyzer();

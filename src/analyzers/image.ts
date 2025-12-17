import { createWorker } from 'tesseract.js';
import Config from '../config';
import type { AnalyzerStrategy } from '../analyzer';

class ImageAnalyzer implements AnalyzerStrategy {
  async getContent(filePath: string): Promise<string | null> {
    const worker = await createWorker(Config.get('language'));

    try {
      const result = await worker.recognize(filePath);

      if (result.data) {
        return result.data.text;
      }
    } catch (err) {
      console.error(err);
    } finally {
      await worker.terminate();
    }

    return null;
  }

  support(filePath: string): boolean {
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

    return imageExtensions.test(filePath);
  }
}

export default new ImageAnalyzer();

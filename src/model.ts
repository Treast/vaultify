import Config from './config';
import OllamaModel from './models/ollama';
import type { AnalysisResult } from './analyzer';

export interface ModelStrategy {
  support(model: string): boolean;
  prompt(content: string): Promise<AnalysisResult | null>;
}

class Model {
  private models: ModelStrategy[] = [OllamaModel];

  async prompt(content: string): Promise<AnalysisResult | null> {
    const model = this.getModel();

    if (!model) {
      return null;
    }

    return await model.prompt(content);
  }

  getModel(): ModelStrategy | null {
    const modelName = Config.get('model');

    for (const model of this.models) {
      if (model.support(modelName)) {
        return model;
      }
    }

    return null;
  }
}

export default new Model();

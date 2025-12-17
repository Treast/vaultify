import curlew from 'curlew.js';

interface IConfig {
  [key: string]: string | string[];
  _: string[];
}

class Config {
  private config: IConfig = { _: [] };
  private targetDirectory: string = '';

  init() {
    this.config = curlew.init({
      model: 'ollama',
      'ollama-api-url': 'http://127.0.0.1:11434/api/generate',
      'ollama-model': 'deepseek-r1',
      language: 'fra',
      output: 'vaultified',
    });

    if (this.config._.length === 0) {
      throw new Error('There is no path specified.');
    }

    this.targetDirectory = this.config._.shift() || './';
  }

  get(key: string): string {
    return (this.config[key] as string) || '';
  }

  getConfig(): IConfig {
    return this.config;
  }

  getTargetDirectory(): string {
    return this.targetDirectory;
  }
}

export default new Config();

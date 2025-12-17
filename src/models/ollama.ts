import axios from 'axios';
import Config from '../config';
import type { AnalysisResult } from '../analyzer';
import type { ModelStrategy } from '../model';

interface IResponse {
  response: string;
}

class OllamaModel implements ModelStrategy {
  async prompt(content: string): Promise<AnalysisResult | null> {
    const prompt = `
Tu es un extracteur de données strict. 
Ton unique tâche est d'analyser le document et de fournir une réponse structurée.
1. Trouve la date la plus pertinente et formate-la en AAAA-MM (Ex: 2025-12). Si tu ne trouves aucune date, renvoie null alors.
2. Génère un titre extrêmement court et descriptif (maximum 3 mots) qui synthétise le contenu.

---
RÈGLE OBLIGATOIRE:
Ta réponse NE doit ABSOLUMENT CONTENIR QUE l'objet JSON complet, sans aucune introduction, explication, pensée, ou texte supplémentaire AVANT ou APRÈS l'objet.
---

Réponds UNIQUEMENT avec un objet JSON en utilisant les clés "date" et "title".

---
CONTENU
---
${content}
`;

    const requestData = {
      model: Config.get('ollama-model'),
      prompt: prompt,
      stream: false,
      format: 'json',
      options: {
        num_predict: 50,
        temperature: 0.1,
      },
    };

    const response = await axios.post<IResponse>(Config.get('ollama-api-url'), requestData);

    const result = response.data.response || null;

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  support(model: string): boolean {
    return model === 'ollama';
  }
}

export default new OllamaModel();

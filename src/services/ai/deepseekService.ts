
import { toast } from "sonner";

// DeepSeek API Key 
const DEEPSEEK_API_KEY = 'sk-66a7e87ba1014599bc1e06888465bb09';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: DeepSeekMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

/**
 * Service to interact with DeepSeek API
 */
export const deepseekService = {
  /**
   * Generate a chat completion from DeepSeek API
   */
  async generateCompletion(
    messages: DeepSeekMessage[],
    options: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
      stream?: boolean;
      onStreamUpdate?: (chunk: string) => void;
    } = {}
  ): Promise<DeepSeekResponse | null> {
    try {
      const model = options.model || 'deepseek-chat';
      const temperature = options.temperature || 0.7;
      const max_tokens = options.max_tokens || 2048;
      const stream = options.stream || false;

      const payload: DeepSeekRequest = {
        model,
        messages,
        temperature,
        max_tokens,
        stream
      };

      if (stream) {
        // Implementation for streaming response
        const response = await fetch(DEEPSEEK_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok || !response.body) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          if (options.onStreamUpdate) {
            options.onStreamUpdate(chunk);
          }
        }
        
        return null; // For streaming, we don't return the full response
      } else {
        // Standard non-streaming implementation
        const response = await fetch(DEEPSEEK_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json() as DeepSeekResponse;
      }
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      toast.error('Erro ao conectar com o serviço de IA. Tente novamente mais tarde.');
      return null;
    }
  },

  /**
   * Generate flow suggestions based on a prompt
   */
  async generateFlowSuggestions(prompt: string): Promise<{ 
    name: string; 
    description: string; 
    steps: { type: string; title: string; config: any }[];
  }[] | null> {
    const systemPrompt = `
    Você é um assistente especializado em criar fluxos de automação para chatbots e sistemas de atendimento.
    Crie 3 sugestões de fluxos de automação baseados na descrição do usuário.
    Cada fluxo deve ter:
    1. Um nome descritivo
    2. Uma descrição breve
    3. Uma sequência de passos lógicos (mensagens, condições, esperas, ações)
    Retorne apenas o JSON sem explicações adicionais.`;

    try {
      const response = await this.generateCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ], { temperature: 0.7 });

      if (!response) return null;

      const content = response.choices[0].message.content;
      
      // Parse the JSON response
      try {
        return JSON.parse(content);
      } catch (e) {
        console.error('Failed to parse DeepSeek response as JSON:', e);
        return null;
      }
    } catch (error) {
      console.error('Error generating flow suggestions:', error);
      return null;
    }
  },

  /**
   * Generate optimizations for an existing flow
   */
  async optimizeFlow(flowDescription: string, currentSteps: any[]): Promise<any[] | null> {
    const systemPrompt = `
    Você é um especialista em otimização de fluxos conversacionais.
    Analise o fluxo atual e sugira melhorias para torná-lo mais eficiente e com melhor experiência do usuário.
    Mantenha a mesma estrutura de dados, apenas otimize os passos existentes ou sugira novos.`;

    try {
      const currentStepsDescription = JSON.stringify(currentSteps);
      
      const response = await this.generateCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Descrição do fluxo: ${flowDescription}\n\nPassos atuais: ${currentStepsDescription}` }
      ], { temperature: 0.5 });

      if (!response) return null;

      const content = response.choices[0].message.content;
      
      // Parse the JSON response
      try {
        return JSON.parse(content);
      } catch (e) {
        console.error('Failed to parse DeepSeek optimization response as JSON:', e);
        return null;
      }
    } catch (error) {
      console.error('Error optimizing flow:', error);
      return null;
    }
  }
};


import { supabase } from "@/integrations/supabase/client";

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AIService {
  private isInitialized = true; // Always ready with Supabase integration

  async initialize(apiKey?: string) {
    // No longer needed with Supabase integration
    this.isInitialized = true;
    console.log('AI Service initialized with OpenAI via Supabase');
  }

  async sendMessage(message: string, history: Array<{user: string, ai: string, timestamp: Date}> = []): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('AI Service not initialized.');
    }

    console.log('Sending message to OpenAI:', message);
    
    try {
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          message,
          history
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Failed to get AI response: ${error.message}`);
      }

      if (!data || !data.response) {
        throw new Error('No response received from AI service');
      }

      return data.response;
    } catch (error) {
      console.error('Error calling AI service:', error);
      throw error;
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

export const aiService = new AIService();

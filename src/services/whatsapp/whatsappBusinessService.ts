
import { supabase } from '@/services/auth/authService';

// Types for WhatsApp Business API
export interface WhatsAppBusinessConfig {
  apiKey?: string;
  phoneNumberId?: string;
  businessAccountId?: string;
  webhookUrl?: string;
  n8nWorkflowId?: string;
  isConfigured: boolean;
}

export interface WhatsAppMessageTemplate {
  id: string;
  name: string;
  components: any[];
  language: string;
  status: string;
}

// Service class for WhatsApp Business API operations
class WhatsAppBusinessService {
  private config: WhatsAppBusinessConfig = {
    isConfigured: false
  };

  constructor() {
    this.loadConfig();
  }

  // Load configuration from Supabase
  async loadConfig(): Promise<WhatsAppBusinessConfig> {
    try {
      const { data, error } = await supabase
        .from('whatsapp_config')
        .select('*')
        .single();

      if (error) throw error;
      
      if (data) {
        this.config = {
          ...data,
          isConfigured: Boolean(data.apiKey && data.phoneNumberId)
        };
      }
      
      return this.config;
    } catch (error) {
      console.error('Error loading WhatsApp configuration:', error);
      return this.config;
    }
  }

  // Save configuration to Supabase
  async saveConfig(config: Partial<WhatsAppBusinessConfig>): Promise<boolean> {
    try {
      const updatedConfig = { ...this.config, ...config };
      
      // Update Supabase
      const { error } = await supabase
        .from('whatsapp_config')
        .upsert({
          id: 1, // Single config record
          ...updatedConfig
        });
      
      if (error) throw error;
      
      // Update local copy
      this.config = {
        ...updatedConfig,
        isConfigured: Boolean(updatedConfig.apiKey && updatedConfig.phoneNumberId)
      };
      
      return true;
    } catch (error) {
      console.error('Error saving WhatsApp configuration:', error);
      return false;
    }
  }

  // Initialize n8n workflow for WhatsApp integration
  async initializeN8nWorkflow(webhookUrl: string): Promise<boolean> {
    try {
      // In a real implementation, this would create or update an n8n workflow
      // For now, we'll just store the webhook URL
      await this.saveConfig({ webhookUrl });
      
      return true;
    } catch (error) {
      console.error('Error initializing n8n workflow:', error);
      return false;
    }
  }

  // Send a WhatsApp message using the configured API
  async sendMessage(to: string, templateName: string, parameters: any[]): Promise<any> {
    try {
      if (!this.config.isConfigured) {
        throw new Error('WhatsApp Business API not configured');
      }

      // In a production environment, this would make an actual API call
      // For now, we'll simulate a response
      
      // If n8n integration is enabled, we would make a request to the n8n webhook
      if (this.config.webhookUrl) {
        // Simulating an API request to n8n
        console.log('Sending WhatsApp message via n8n webhook');
      } else {
        // Direct API call to WhatsApp Business API
        console.log('Sending WhatsApp message via direct API');
      }
      
      // Simulate a successful API response
      return {
        success: true,
        messageId: `msg_${Math.random().toString(36).substring(2, 15)}`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  // Get available message templates
  async getTemplates(): Promise<WhatsAppMessageTemplate[]> {
    try {
      if (!this.config.isConfigured) {
        return [];
      }
      
      // In a production environment, this would fetch templates from the WhatsApp Business API
      // For now, we'll return some mock templates
      
      return [
        {
          id: 'template_welcome',
          name: 'welcome_message',
          components: [],
          language: 'pt_BR',
          status: 'APPROVED'
        },
        {
          id: 'template_order_confirmation',
          name: 'order_confirmation',
          components: [],
          language: 'pt_BR',
          status: 'APPROVED'
        },
        {
          id: 'template_shipping_update',
          name: 'shipping_update',
          components: [],
          language: 'pt_BR',
          status: 'APPROVED'
        }
      ];
    } catch (error) {
      console.error('Error getting WhatsApp templates:', error);
      return [];
    }
  }
}

export const whatsappBusinessService = new WhatsAppBusinessService();


import { useState } from "react";
import { deepseekService, DeepSeekMessage } from "@/services/ai/deepseekService";

export const useAIAssistant = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<DeepSeekMessage[]>([]);
  const [flowSuggestions, setFlowSuggestions] = useState<any[]>([]);

  // Add a message to the conversation
  const addMessage = (role: 'user' | 'assistant' | 'system', content: string) => {
    const newMessage: DeepSeekMessage = { role, content };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage;
  };

  // Generate a response from the assistant
  const generateResponse = async (userPrompt: string) => {
    setIsProcessing(true);
    
    try {
      // Add the user message to the conversation
      addMessage('user', userPrompt);
      
      // Get conversation history
      const conversationHistory = [...messages, { role: 'user' as const, content: userPrompt }];
      
      // Generate response from DeepSeek
      const response = await deepseekService.generateCompletion(
        conversationHistory,
        { temperature: 0.7 }
      );
      
      if (response && response.choices && response.choices.length > 0) {
        const assistantMessage = response.choices[0].message;
        addMessage('assistant', assistantMessage.content);
        return assistantMessage.content;
      }
      
      return null;
    } catch (error) {
      console.error("Error generating AI response:", error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate flow suggestions based on a prompt
  const generateFlowSuggestions = async (prompt: string) => {
    setIsProcessing(true);
    
    try {
      const suggestions = await deepseekService.generateFlowSuggestions(prompt);
      if (suggestions) {
        setFlowSuggestions(suggestions);
        return suggestions;
      }
      return null;
    } catch (error) {
      console.error("Error generating flow suggestions:", error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Optimize an existing flow
  const optimizeFlow = async (flowDescription: string, currentSteps: any[]) => {
    setIsProcessing(true);
    
    try {
      return await deepseekService.optimizeFlow(flowDescription, currentSteps);
    } catch (error) {
      console.error("Error optimizing flow:", error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Clear conversation history
  const clearConversation = () => {
    setMessages([]);
  };

  return {
    isProcessing,
    messages,
    flowSuggestions,
    addMessage,
    generateResponse,
    generateFlowSuggestions,
    optimizeFlow,
    clearConversation
  };
};


import React, { useState, useCallback } from 'react';
import { ThreeJSAnimation } from '../components/ThreeJSAnimation';
import { Chatbot } from '../components/Chatbot';
import { toast } from 'sonner';
import { aiService } from '../utils/aiService';

const Index = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{user: string, ai: string, timestamp: Date}>>([
    {
      user: "Hello! How does this animation work?",
      ai: "Hi there! The 3D animation above responds to your typing in real-time. As you type, the objects will spin faster and change colors. Try typing something to see the magic happen!",
      timestamp: new Date()
    }
  ]);

  const handleTypingChange = useCallback((typing: boolean) => {
    setIsTyping(typing);
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    try {
      console.log('Sending message to AI:', message);
      
      // Show loading state
      toast.info("Getting AI response...");
      
      // Get AI response using OpenAI service
      const aiResponse = await aiService.sendMessage(message, chatHistory);
      
      // Add message to history
      setChatHistory(prev => [...prev, {
        user: message,
        ai: aiResponse,
        timestamp: new Date()
      }]);

      toast.success("AI response received! Watch the animation respond.");
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error("Failed to get AI response. Please try again.");
      
      // Fallback to a generic response
      setChatHistory(prev => [...prev, {
        user: message,
        ai: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment!",
        timestamp: new Date()
      }]);
    }
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Three.js Animation Container */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <ThreeJSAnimation isTyping={isTyping} />
        
        {/* Overlay with title */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Chatbot
          </h1>
          <p className="text-blue-200 text-lg">
            Powered by OpenAI - Watch the animation respond to your typing
          </p>
        </div>

        {/* Typing indicator */}
        {isTyping && (
          <div className="absolute bottom-8 right-8 z-10">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">Animation responding...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className="relative">
        <Chatbot 
          onTypingChange={handleTypingChange}
          onSendMessage={handleSendMessage}
          chatHistory={chatHistory}
        />
      </div>
    </div>
  );
};

export default Index;

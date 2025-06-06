
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  user: string;
  ai: string;
  timestamp: Date;
}

interface ChatbotProps {
  onTypingChange: (isTyping: boolean) => void;
  onSendMessage: (message: string) => Promise<void>;
  chatHistory: ChatMessage[];
}

export const Chatbot: React.FC<ChatbotProps> = ({ 
  onTypingChange, 
  onSendMessage, 
  chatHistory 
}) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Handle typing detection with debounce
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentMessage(value);
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set typing to true
    onTypingChange(true);
    
    // Set timeout to stop typing after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      onTypingChange(false);
    }, 1000);
  }, [onTypingChange]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;
    
    setIsLoading(true);
    onTypingChange(false);
    
    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    try {
      await onSendMessage(currentMessage);
      setCurrentMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
        <CardContent className="p-6">
          {/* Chat History */}
          <ScrollArea 
            className="h-96 w-full pr-4 mb-4"
            ref={scrollAreaRef}
          >
            <div className="space-y-4">
              {chatHistory.map((message, index) => (
                <div key={index} className="space-y-3">
                  {/* User message */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs lg:max-w-md shadow-lg animate-fade-in">
                      <p className="text-sm">{message.user}</p>
                      <span className="text-xs text-blue-200 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white/20 text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs lg:max-w-md shadow-lg animate-fade-in">
                      <p className="text-sm">{message.ai}</p>
                      <span className="text-xs text-gray-300 mt-1 block">
                        AI • {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white/20 text-white rounded-2xl rounded-tl-sm px-4 py-3 animate-pulse">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Input
                value={currentMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message and watch the animation respond..."
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-all duration-200 disabled:opacity-50"
            >
              <Send size={18} />
            </Button>
          </div>

          {/* Instructions */}
          <p className="text-center text-gray-400 text-xs mt-4">
            Start typing to see the 3D animation respond to your input in real-time
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

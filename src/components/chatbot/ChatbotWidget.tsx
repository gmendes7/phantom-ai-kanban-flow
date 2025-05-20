
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Message, ChatResponse } from '@/types/chatbot';
import ChatbotMessage from './ChatbotMessage';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Hello! I am your Phantom AI assistant. How can I help you with your Kanban board today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get mock response based on user message
      const botResponse = getMockResponse(message);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: botResponse.text,
        links: botResponse.links
      }]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: 'Sorry, I encountered an error processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock response function (in a real app, this would call an AI service)
  const getMockResponse = (query: string): ChatResponse => {
    const userQueryLower = query.toLowerCase();
    
    if (userQueryLower.includes('create') || userQueryLower.includes('add task') || userQueryLower.includes('nova tarefa')) {
      return {
        text: 'To create a new task, click the "Add Task" button at the top right of the board. You can then fill in the task details including title, description, status, priority, and due date.',
        links: [
          {
            text: 'Add a task now',
            action: '/dashboard/kanban'
          }
        ]
      };
    }
    
    if (userQueryLower.includes('delete') || userQueryLower.includes('remove')) {
      return {
        text: 'To delete a task, hover over the task card and click the three dots menu. Then select "Delete" from the dropdown menu. You can also delete a column if it has no tasks in it.',
      };
    }
    
    if (userQueryLower.includes('password') || userQueryLower.includes('senha')) {
      return {
        text: 'To reset your password, go to the login page and click on "Forgot password". Alternatively, you can change your password in the Settings page if you are already logged in.',
        links: [
          {
            text: 'Go to Settings',
            action: '/dashboard/settings'
          }
        ]
      };
    }
    
    if (userQueryLower.includes('who') || userQueryLower.includes('created') || userQueryLower.includes('criou') || userQueryLower.includes('developer')) {
      return {
        text: 'This system was developed by @schjneiderr. You can find more information in the About section of the Settings page.',
        links: [
          {
            text: 'View About',
            action: '/dashboard/settings'
          }
        ]
      };
    }
    
    if (userQueryLower.includes('late') || userQueryLower.includes('overdue') || userQueryLower.includes('atrasada')) {
      return {
        text: 'Tasks that are past their due date are marked as "Overdue" with a red badge. You can see them directly on your Kanban board.',
      };
    }
    
    if (userQueryLower.includes('ai') || userQueryLower.includes('predict') || userQueryLower.includes('suggestion')) {
      return {
        text: 'Our AI system analyzes your task history to provide deadline predictions and workflow suggestions. You can see AI insights by clicking the "AI Insights" button at the top of the Kanban board.',
      };
    }
    
    if (userQueryLower.includes('multiple') || userQueryLower.includes('boards') || userQueryLower.includes('mais quadros')) {
      return {
        text: 'Support for multiple boards is coming soon! We\'re working on this feature and it will be available in a future update.',
      };
    }
    
    // Default response
    return {
      text: 'I\'m your Phantom Kanban assistant. I can help you with creating tasks, managing your board, understanding AI features, or navigating the application. What would you like to know?'
    };
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <Button
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        <MessageCircle size={20} />
      </Button>
      
      {/* Chatbot panel */}
      {isOpen && (
        <div 
          className={`
            fixed bottom-20 right-4 w-80 sm:w-96 rounded-lg shadow-lg overflow-hidden flex flex-col
            bg-card border border-border transition-all duration-300 ease-in-out animate-fade-in
            ${isMinimized ? 'h-12' : 'h-[450px]'}
          `}
        >
          {/* Chat header */}
          <div className="p-3 bg-primary flex items-center justify-between">
            <h3 className="font-medium text-primary-foreground">Phantom AI Assistant</h3>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={toggleChat}
              >
                <X size={14} />
              </Button>
            </div>
          </div>
          
          {/* Chat content - conditionally render based on minimized state */}
          {!isMinimized && (
            <>
              {/* Messages container */}
              <div className="flex-1 p-3 overflow-y-auto bg-card">
                <div className="space-y-4">
                  {messages.map(msg => (
                    <ChatbotMessage key={msg.id} message={msg} />
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input area */}
              <form onSubmit={handleSendMessage} className="p-3 bg-card border-t border-border">
                <div className="flex items-center">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask something..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="ml-2"
                    disabled={isLoading || !message.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

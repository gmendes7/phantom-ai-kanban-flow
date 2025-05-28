
import { X, Minimize2, Maximize2, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import ChatbotMessage from './ChatbotMessage';
import { Message } from '@/types/chatbot';

interface ChatPanelProps {
  position: { x: number; y: number };
  isMinimized: boolean;
  messages: Message[];
  isLoading: boolean;
  message: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  onToggleMinimize: () => void;
  onToggleChat: () => void;
  onMessageChange: (value: string) => void;
  onSendMessage: (e?: React.FormEvent) => void;
}

const ChatPanel = ({
  position,
  isMinimized,
  messages,
  isLoading,
  message,
  messagesEndRef,
  inputRef,
  onToggleMinimize,
  onToggleChat,
  onMessageChange,
  onSendMessage
}: ChatPanelProps) => {
  return (
    <div 
      className={`
        fixed z-40 w-80 sm:w-96 rounded-xl shadow-2xl overflow-hidden flex flex-col
        bg-gradient-to-br from-phantom-50 to-white border-2 border-phantom-200 
        transition-all duration-300 ease-in-out animate-fade-in backdrop-blur-sm
        ${isMinimized ? 'h-14' : 'h-[500px]'}
      `}
      style={{ 
        right: `${Math.max(0, position.x - 320)}px`, 
        bottom: `${position.y + 80}px` 
      }}
    >
      {/* Cabeçalho do chat com gradiente */}
      <div className="p-4 bg-gradient-to-r from-phantom-600 to-phantom-700 flex items-center justify-between border-b border-phantom-500">
        <div className="flex items-center">
          <Ghost className="mr-3 h-5 w-5 text-white animate-pulse" />
          <div>
            <h3 className="font-bold text-white">Phantom AI</h3>
            <p className="text-xs text-phantom-100">Seu fantasminha guia 👻</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-phantom-500/30"
            onClick={onToggleMinimize}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-phantom-500/30"
            onClick={onToggleChat}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
      
      {/* Conteúdo do chat */}
      {!isMinimized && (
        <>
          {/* Container de mensagens com scroll customizado */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-phantom-25 to-white custom-scrollbar">
            <div className="space-y-4">
              {messages.map(msg => (
                <ChatbotMessage key={msg.id} message={msg} />
              ))}
              
              {isLoading && (
                <div className="flex items-center space-x-2 justify-start">
                  <div className="w-3 h-3 rounded-full bg-phantom-500 animate-bounce"></div>
                  <div className="w-3 h-3 rounded-full bg-phantom-500 animate-bounce delay-100"></div>
                  <div className="w-3 h-3 rounded-full bg-phantom-500 animate-bounce delay-200"></div>
                  <span className="text-sm text-phantom-600 ml-2">Phantom AI está pensando...</span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Área de input com design melhorado */}
          <form onSubmit={onSendMessage} className="p-4 bg-white border-t border-phantom-200">
            <div className="flex items-center space-x-3">
              <Input
                ref={inputRef}
                type="text"
                placeholder="💬 Pergunte algo ao fantasminha..."
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                className="flex-1 border-phantom-300 focus:border-phantom-500 focus:ring-phantom-500/20"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-phantom-600 hover:bg-phantom-700 shadow-lg"
                disabled={isLoading || !message.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatPanel;

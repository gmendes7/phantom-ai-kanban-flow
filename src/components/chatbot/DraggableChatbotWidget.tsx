import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Minimize2, Maximize2, Ghost } from 'lucide-react';
import { Message, ChatResponse } from '@/types/chatbot';
import ChatbotMessage from './ChatbotMessage';

const DraggableChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Olá! Eu sou o assistente Phantom AI. Como posso ajudar você com seu quadro Kanban hoje?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Scroll para o final das mensagens quando uma nova mensagem é adicionada
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Foca no input quando o chat é aberto
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);
  
  const toggleChat = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return; // Não arrastar quando o chat estiver aberto
    
    setIsDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Limitar posição dentro da viewport
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    setPosition({
      x: Math.max(10, Math.min(newX, maxX)),
      y: Math.max(10, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);
  
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
      // Simula o atraso do processamento da IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Obtém resposta simulada com base na mensagem do usuário
      const botResponse = getMockResponse(message);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: botResponse.text,
        links: botResponse.links
      }]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: 'Desculpe, encontrei um erro ao processar sua solicitação. Por favor, tente novamente.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função de resposta simulada (em um app real, isso chamaria um serviço de IA)
  const getMockResponse = (query: string): ChatResponse => {
    const userQueryLower = query.toLowerCase();
    
    if (userQueryLower.includes('criar') || userQueryLower.includes('adicionar tarefa') || userQueryLower.includes('nova tarefa')) {
      return {
        text: 'Para criar uma nova tarefa, clique no botão "Adicionar Tarefa" no canto superior direito do quadro. Você pode então preencher os detalhes da tarefa, incluindo título, descrição, status, prioridade e data de vencimento.',
        links: [
          {
            text: 'Adicionar uma tarefa agora',
            action: '/dashboard/kanban'
          }
        ]
      };
    }
    
    if (userQueryLower.includes('quem') || userQueryLower.includes('criou') || userQueryLower.includes('desenvolvedor')) {
      return {
        text: 'Este sistema foi desenvolvido por Gabriel Mendes (schjneiderr), 18 anos, dono da Trinity Tecnologias. O Phantom AI Kanban Flow foi criado para revolucionar o gerenciamento de tarefas com inteligência artificial.',
        links: [
          {
            text: 'Ver informações de contato',
            action: '/contato'
          }
        ]
      };
    }
    
    if (userQueryLower.includes('spectre') || userQueryLower.includes('sobre')) {
      return {
        text: 'O Spectre é uma plataforma avançada de gerenciamento de projetos que utiliza IA para otimizar fluxos de trabalho. Foi desenvolvida com React, TypeScript e Tailwind CSS para proporcionar uma experiência moderna e eficiente.',
    };
    }
    
    if (userQueryLower.includes('excluir') || userQueryLower.includes('apagar') || userQueryLower.includes('remover')) {
      return {
        text: 'Para excluir uma tarefa, passe o mouse sobre o cartão da tarefa e clique no menu de três pontos. Em seguida, selecione "Excluir" no menu suspenso. Você também pode excluir uma coluna se não houver tarefas nela.',
      };
    }
    
    if (userQueryLower.includes('contato') || userQueryLower.includes('telefone') || userQueryLower.includes('email')) {
      return {
        text: 'Você pode entrar em contato com a Trinity Tecnologias pelos seguintes meios: Telefone: (67) 99141-5904, Email: tecnologiastrinity@gmail.com ou visitando nossa página de contato.',
        links: [
          {
            text: 'Ver página de contato',
            action: '/contato'
          }
        ]
      };
    }
    
    // Resposta padrão
    return {
      text: 'Sou seu assistente Phantom AI no Spectre. Posso ajudar você com a criação de tarefas, gerenciamento do seu quadro, personalização de temas, entendimento dos recursos de IA ou navegação no aplicativo. O que você gostaria de saber?'
    };
  };

  return (
    <>
      {/* Botão de toggle do chatbot - agora arrastável */}
      <Button
        ref={buttonRef}
        className={`
          fixed h-12 w-12 rounded-full shadow-lg z-50 transition-all duration-300 select-none
          ${isDragging ? 'cursor-grabbing scale-110' : 'cursor-pointer hover:scale-105'}
          ${isAnimating ? 'animate-bounce' : ''}
        `}
        style={{ 
          right: `${position.x}px`, 
          bottom: `${position.y}px`,
          transform: isDragging ? 'rotate(10deg)' : 'rotate(0deg)'
        }}
        onClick={toggleChat}
        onMouseDown={handleMouseDown}
      >
        {isAnimating ? (
          <Ghost className={`h-5 w-5 ${isAnimating ? 'animate-pulse' : ''}`} />
        ) : (
          <MessageCircle size={20} />
        )}
      </Button>
      
      {/* Painel do chatbot */}
      {isOpen && (
        <div 
          className={`
            fixed z-40 w-80 sm:w-96 rounded-lg shadow-lg overflow-hidden flex flex-col
            bg-card border border-border transition-all duration-300 ease-in-out animate-fade-in
            ${isMinimized ? 'h-12' : 'h-[450px]'}
          `}
          style={{ 
            right: `${Math.max(0, position.x - 320)}px`, 
            bottom: `${position.y + 70}px` 
          }}
        >
          {/* Cabeçalho do chat */}
          <div className="p-3 bg-primary flex items-center justify-between">
            <div className="flex items-center">
              <Ghost className="mr-2 h-4 w-4 text-primary-foreground animated-ghost" />
              <h3 className="font-medium text-primary-foreground">Assistente Phantom AI</h3>
            </div>
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
          
          {/* Conteúdo do chat - renderizado condicionalmente com base no estado minimizado */}
          {!isMinimized && (
            <>
              {/* Contêiner de mensagens */}
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
              
              {/* Área de input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-card border-t border-border">
                <div className="flex items-center">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Pergunte algo..."
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

export default DraggableChatbotWidget;

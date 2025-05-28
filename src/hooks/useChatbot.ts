
import { useState, useRef, useEffect } from 'react';
import { Message, ChatResponse } from '@/types/chatbot';

export const useChatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: '👻 Olá! Eu sou o Phantom AI, seu fantasminha guia! Como posso ajudar você com seu quadro Kanban hoje?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMockResponse = (query: string): ChatResponse => {
    const userQueryLower = query.toLowerCase();
    
    if (userQueryLower.includes('criar') || userQueryLower.includes('adicionar tarefa') || userQueryLower.includes('nova tarefa')) {
      return {
        text: '👻 Para criar uma nova tarefa, clique no botão "Adicionar Tarefa" no canto superior direito do quadro. Você pode então preencher os detalhes da tarefa, incluindo título, descrição, status, prioridade e data de vencimento.',
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
        text: '👻 Este sistema foi desenvolvido por Gabriel Mendes (schjneiderr), 18 anos, dono da Trinity Tecnologias. O Phantom AI Kanban Flow foi criado para revolucionar o gerenciamento de tarefas com inteligência artificial!',
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
        text: '👻 O Spectre é uma plataforma avançada de gerenciamento de projetos que utiliza IA para otimizar fluxos de trabalho. Foi desenvolvida com React, TypeScript e Tailwind CSS para proporcionar uma experiência moderna e eficiente.',
      };
    }
    
    if (userQueryLower.includes('excluir') || userQueryLower.includes('apagar') || userQueryLower.includes('remover')) {
      return {
        text: '👻 Para excluir uma tarefa, passe o mouse sobre o cartão da tarefa e clique no menu de três pontos. Em seguida, selecione "Excluir" no menu suspenso. Você também pode excluir uma coluna se não houver tarefas nela.',
      };
    }
    
    if (userQueryLower.includes('contato') || userQueryLower.includes('telefone') || userQueryLower.includes('email')) {
      return {
        text: '👻 Você pode entrar em contato com a Trinity Tecnologias pelos seguintes meios: Telefone: (67) 99141-5904, Email: tecnologiastrinity@gmail.com ou visitando nossa página de contato.',
        links: [
          {
            text: 'Ver página de contato',
            action: '/contato'
          }
        ]
      };
    }
    
    return {
      text: '👻 Sou seu assistente Phantom AI no Spectre! Posso ajudar você com a criação de tarefas, gerenciamento do seu quadro, personalização de temas, entendimento dos recursos de IA ou navegação no aplicativo. O que você gostaria de saber?'
    };
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
        content: '👻 Ops! Encontrei um erro ao processar sua solicitação. Por favor, tente novamente.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    message,
    setMessage,
    messages,
    isLoading,
    messagesEndRef,
    inputRef,
    handleSendMessage
  };
};

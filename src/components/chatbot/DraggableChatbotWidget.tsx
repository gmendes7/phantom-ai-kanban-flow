
import { useState, useEffect } from 'react';
import { useDraggable } from '@/hooks/useDraggable';
import { useChatbot } from '@/hooks/useChatbot';
import ChatToggleButton from './ChatToggleButton';
import ChatPanel from './ChatPanel';

const DraggableChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { position, isDragging, elementRef, handleMouseDown } = useDraggable();
  const {
    message,
    setMessage,
    messages,
    isLoading,
    messagesEndRef,
    inputRef,
    handleSendMessage
  } = useChatbot();
  
  // Foca no input quando o chat é aberto
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);
  
  const toggleChat = () => {
    if (!isOpen) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Não permitir arrastar quando o chat estiver aberto
  const handleButtonMouseDown = (e: React.MouseEvent) => {
    if (!isOpen) {
      handleMouseDown(e);
    }
  };

  return (
    <>
      {/* Botão de toggle do chatbot */}
      <ChatToggleButton
        position={position}
        isDragging={isDragging}
        isAnimating={isAnimating}
        isOpen={isOpen}
        elementRef={elementRef}
        onToggleChat={toggleChat}
        onMouseDown={handleButtonMouseDown}
      />
      
      {/* Painel do chatbot */}
      {isOpen && (
        <ChatPanel
          position={position}
          isMinimized={isMinimized}
          messages={messages}
          isLoading={isLoading}
          message={message}
          messagesEndRef={messagesEndRef}
          inputRef={inputRef}
          onToggleMinimize={toggleMinimize}
          onToggleChat={toggleChat}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
        />
      )}
    </>
  );
};

export default DraggableChatbotWidget;


import { MessageCircle, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatToggleButtonProps {
  position: { x: number; y: number };
  isDragging: boolean;
  isAnimating: boolean;
  isOpen: boolean;
  elementRef: React.RefObject<HTMLButtonElement>;
  onToggleChat: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

const ChatToggleButton = ({
  position,
  isDragging,
  isAnimating,
  isOpen,
  elementRef,
  onToggleChat,
  onMouseDown
}: ChatToggleButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          ref={elementRef}
          className={`
            fixed h-14 w-14 rounded-full shadow-xl z-50 transition-all duration-300 select-none
            bg-gradient-to-br from-phantom-500 to-phantom-600 hover:from-phantom-600 hover:to-phantom-700
            border-2 border-phantom-300 hover:border-phantom-400
            ${isDragging ? 'cursor-grabbing scale-110 shadow-2xl' : 'cursor-pointer hover:scale-110 hover:shadow-2xl'}
            ${isAnimating ? 'animate-bounce' : ''}
            ${!isOpen ? 'hover:animate-pulse' : ''}
          `}
          style={{ 
            right: `${position.x}px`, 
            bottom: `${position.y}px`,
            transform: isDragging ? 'rotate(10deg)' : 'rotate(0deg)',
            filter: isDragging ? 'brightness(1.2)' : 'brightness(1)'
          }}
          onClick={onToggleChat}
          onMouseDown={onMouseDown}
        >
          {isAnimating ? (
            <Ghost className={`h-6 w-6 text-white ${isAnimating ? 'animate-pulse' : ''}`} />
          ) : (
            <MessageCircle size={24} className="text-white" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-phantom-800 text-white border-phantom-600">
        <p className="font-medium">💬 Fale com o Phantom AI</p>
        <p className="text-xs text-phantom-200">Arraste para mover • Clique para conversar</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ChatToggleButton;

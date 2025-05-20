
import { Link } from 'react-router-dom';
import { Message } from '@/types/chatbot';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatbotMessageProps {
  message: Message;
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({ message }) => {
  const isSystem = message.role === 'system';
  
  return (
    <div className={`flex ${isSystem ? 'justify-start' : 'justify-end'}`}>
      <div className={`
        flex items-start space-x-2 max-w-[85%]
        ${isSystem ? '' : 'flex-row-reverse space-x-reverse'}
      `}>
        {/* Avatar */}
        <Avatar className={`h-8 w-8 ${isSystem ? 'bg-primary' : 'bg-secondary'}`}>
          <AvatarFallback>
            {isSystem ? 'AI' : 'U'}
          </AvatarFallback>
        </Avatar>
        
        {/* Message bubble */}
        <div>
          <div className={`
            py-2 px-3 rounded-lg
            ${isSystem 
              ? 'bg-secondary text-foreground' 
              : 'bg-primary text-primary-foreground'}
          `}>
            <p className="text-sm whitespace-pre-line">{message.content}</p>
          </div>
          
          {/* Action links */}
          {isSystem && message.links && message.links.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.links.map((link, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  asChild
                >
                  <Link to={link.action}>
                    {link.text}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotMessage;

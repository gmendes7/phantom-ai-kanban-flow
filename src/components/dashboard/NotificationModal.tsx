
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Check, Clock, AlertTriangle, X, Ghost } from 'lucide-react';

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationModal = ({ open, onOpenChange }: NotificationModalProps) => {
  const notifications = [
    {
      id: 1,
      title: 'Boas-vindas ao Phantom AI! 👻',
      message: 'Explore o quadro Kanban e converse com nossa IA fantasminha',
      time: 'agora',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Dica: Arraste o fantasminha! 🎯',
      message: 'O botão da IA pode ser arrastado para qualquer posição da tela',
      time: '2 min atrás',
      type: 'tip',
      read: false
    },
    {
      id: 3,
      title: 'Sistema atualizado! ✨',
      message: 'Nova versão com melhorias mobile e animações dos fantasmas',
      time: '1 hora atrás',
      type: 'success',
      read: false
    },
    {
      id: 4,
      title: 'Conheça a Spectre',
      message: 'Visite a página "Sobre" para conhecer mais sobre nossa plataforma',
      time: '3 horas atrás',
      type: 'info',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Ghost className="h-4 w-4 text-phantom-500 animate-pulse" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-phantom-500" />
              Notificações
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-phantom-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all duration-200 hover:bg-accent/50 ${
                !notification.read 
                  ? 'bg-phantom-50 border-phantom-200 shadow-sm' 
                  : 'bg-background hover:bg-accent/30'
              }`}
            >
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium leading-tight">{notification.title}</h4>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-phantom-500 animate-pulse"></div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{notification.message}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {notification.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            Marcar todas como lidas
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            Limpar todas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;

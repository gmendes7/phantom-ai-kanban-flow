
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Check, Clock, AlertTriangle } from 'lucide-react';

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationModal = ({ open, onOpenChange }: NotificationModalProps) => {
  const notifications = [
    {
      id: 1,
      title: 'Nova tarefa atribuída',
      message: 'Você foi atribuído à tarefa "Implementar autenticação"',
      time: '5 min atrás',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Prazo se aproximando',
      message: 'A tarefa "Design da página inicial" vence em 2 dias',
      time: '1 hora atrás',
      type: 'warning',
      read: false
    },
    {
      id: 3,
      title: 'Tarefa concluída',
      message: 'A tarefa "Testar gateway de pagamento" foi marcada como concluída',
      time: '3 horas atrás',
      type: 'success',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
            <Badge variant="secondary" className="ml-auto">
              {notifications.filter(n => !n.read).length}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors hover:bg-accent/50 ${
                !notification.read ? 'bg-accent/20 border-primary/20' : 'bg-background'
              }`}
            >
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {notification.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            Marcar todas como lidas
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Limpar todas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
